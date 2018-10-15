import { defer, merge, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import {
  AfterContentInit, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ContentChildren, ElementRef, EventEmitter, Input, IterableDiffers, NgZone, OnChanges, OnDestroy,
  Optional, Output, QueryList, SimpleChanges, ViewEncapsulation
} from '@angular/core';

import { NtColumnDirective, NtColumnSortChange } from './cell.directive';

@Component({
  selector: 'nt-table, table[nt-table]',
  template: CDK_TABLE_TEMPLATE,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-table'
  }
})
export class NtTableComponent<T> extends CdkTable<T> implements AfterContentInit, OnChanges {

  private _selectionModel: SelectionModel<T> = new SelectionModel(true, undefined, false);

  private _multiSortable = false;

  private _selectable = false;

  private readonly _destroy = new Subject<void>();

  readonly columSortChanges: Observable<NtColumnSortChange> = defer(() => {
    if (this._contentColumns) {
      return merge(...this._contentColumns.map(column => column._sortChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.columSortChanges));
  });

  @Input()
  set selectable(value: boolean) { this._selectable = coerceBooleanProperty(value); }
  get selectable() { return this._selectable; }

  get isAllSelected() { return false; }

  get selected() { return this._selectionModel.selected; }

  @ContentChildren(NtColumnDirective) _contentColumns: QueryList<NtColumnDirective>;

  @Output() readonly selectedChange: EventEmitter<T | T[]> = new EventEmitter();

  @Output() readonly sortChange: EventEmitter<NtColumnSortChange | NtColumnSortChange[]> = new EventEmitter();

  constructor(
    private _ngZone: NgZone,
    protected _differs: IterableDiffers,
    protected _changeDetectorRef: ChangeDetectorRef,
    protected _elementRef: ElementRef,
    @Attribute('role') role: string,
    @Optional() protected readonly _dir: Directionality) {
    super(_differs, _changeDetectorRef, _elementRef, role, _dir);
  }

  ngAfterContentInit() {
    this._contentColumns.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._changeDetectorRef.markForCheck();
    });
  }

  selectAll() {
    if (!this.isAllSelected) {
      // this._selectionModel.select(...this.dataSource);
    } else {
      this._selectionModel.clear();
    }
    this.selectedChange.emit(this._selectionModel.selected);
  }

  select(item: T) {
    const wasSelected = this.checkSelected(item);
    if (wasSelected) {
      this._selectionModel.deselect(item);
    } else {
      this._selectionModel.select(item);
    }

    this.selectedChange.emit(this._selectionModel.selected);
  }

  ngOnChanges(change: SimpleChanges) {
    if (change && change.dataSource && !change.dataSource.firstChange) {
      this._selectionModel.clear();
    }
  }

  checkSelected(item: T) {
    return this._selectionModel.isSelected(item);
  }

  private _clearSort(filter?: NtColumnSortChange) {
    this._contentColumns
      .filter(column => column.name !== (filter ? filter.column : ''))
      .forEach(column => column.sort = '');
      this._changeDetectorRef.markForCheck();
  }

  private _resetOptions() {
    const changedOrDestroyed = merge(this._contentColumns.changes, this._destroy);

    this.columSortChanges
      .pipe(takeUntil(changedOrDestroyed), filter(event => event.isUserInput))
      .subscribe(event => {
        if (!this._multiSortable) {
          this._clearSort(event);
        }
        this.sortChange.emit(event);
      });

    merge(...this._contentColumns.map(column => column._sortChange))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }


  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    super.ngOnDestroy();
  }
}
