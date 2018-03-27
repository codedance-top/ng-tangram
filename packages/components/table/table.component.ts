import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild,
  ContentChildren, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output,
  QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation
} from '@angular/core';
import { fadeIn } from '@ng-tangram/animate/fading';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

import { NT_COLUMN_TABLE, NtColumn, NtColumnSortChange, NtColumnTable } from './column';
import { NtColumnComponent, NtColumnHeaderDirective } from './column.directive';

@Component({
  selector: 'nt-table',
  templateUrl: 'table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NT_COLUMN_TABLE, useExisting: NtTableComponent }
  ],
  host: {
    'class': 'nt-table'
  }
})
export class NtTableComponent<T> implements NtColumnTable, AfterContentInit, OnChanges, OnDestroy {

  columnComponent = NtColumnComponent;

  @Input() class: string;

  private _selectorType: 'checkbox' | 'select' = 'checkbox';

  private _selectionModel: SelectionModel<T> = new SelectionModel(true, null, false);

  private _multipleSortable = false;

  private readonly _destroy = new Subject<void>();

  @ContentChildren(NtColumnComponent)
  private _columns: QueryList<NtColumnComponent>;

  get columns() {
    return this._columns ? this._columns.toArray() : [];
  }

  @Input() dataSource: Array<T>;

  @Output()
  readonly selectionChange: EventEmitter<T | T[]> = new EventEmitter();

  @Output()
  readonly sortChanges: EventEmitter<NtColumnSortChange | NtColumnSortChange[]> = new EventEmitter();

  readonly columSortChanges: Observable<NtColumnSortChange> = defer(() => {
    if (this._columns) {
      return merge(...this._columns.map(column => column.sortChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.columSortChanges));
  });

  get selectorType() { return this._selectorType; }

  get selector() { return this.selectionChange.observers.length > 0; }

  get allSelected() { return this._selectionModel.selected.length === this.dataSource.length; }

  get selected() { return this._selectionModel.selected; }

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _element: ElementRef) { }

  ngOnChanges(change: SimpleChanges) {
    if (change && change.dataSource && !change.dataSource.firstChange) {
      this._selectionModel.clear();
    }
  }

  ngAfterContentInit() {
    this._columns.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._changeDetectorRef.markForCheck();
    });
  }

  selectAll() {
    if (!this.allSelected) {
      this._selectionModel.select(...this.dataSource);
    } else {
      this._selectionModel.clear();
    }
    this.selectionChange.emit(this._selectionModel.selected);
  }

  select(item: T) {
    const wasSelected = this.checkSelected(item);
    if (wasSelected) {
      this._selectionModel.deselect(item);
    } else {
      this._selectionModel.select(item);
    }

    this.selectionChange.emit(this._selectionModel.selected);
  }

  checkSelected(item: T) {
    return this._selectionModel.isSelected(item);
  }

  private _clearSort(filter?: NtColumnSortChange) {
    this._columns
      .filter(column => column.name !== filter.column)
      .forEach(column => column.sort = '');
  }

  private _resetOptions() {
    const changedOrDestroyed = merge(this._columns.changes, this._destroy);

    this.columSortChanges
      .pipe(takeUntil(changedOrDestroyed), filter(event => event.isUserInput))
      .subscribe(event => {
        if (!this._multipleSortable) {
          this._clearSort(event);
        }
        this.sortChanges.emit(event);
      });

    merge(...this._columns.map(option => option.sortChange))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }


  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
