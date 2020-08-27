import { defer, merge, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { CDK_TABLE_TEMPLATE, CdkTable, _CoalescedStyleScheduler, CDK_TABLE } from '@angular/cdk/table';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  IterableDiffers,
  NgZone,
  OnChanges,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { NtColumnDirective, NtColumnSort, NtColumnSortChange } from './cell.directive';

@Component({
  selector: 'nt-table, table[nt-table]',
  template: CDK_TABLE_TEMPLATE,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    _CoalescedStyleScheduler,
    { provide: CdkTable, useExisting: NtTableComponent },
    { provide: CDK_TABLE, useExisting: NtTableComponent },
  ],
  host: {
    'class': 'nt-table'
  }
})
export class NtTableComponent<T> extends CdkTable<T> implements AfterContentInit, OnChanges {

  private _multiSortable = false;

  private readonly _destroy = new Subject<void>();

  readonly columSortChanges: Observable<NtColumnSortChange> = defer(() => {
    if (this._contentColumns) {
      return merge<NtColumnSortChange>(...this._contentColumns.map(column => column._sortChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.columSortChanges));
  });

  private _sort: string;

  @Input()
  get sort() { return this._sort; }
  set sort(value: string) {
    this._sort = value;
  }

  @ContentChildren(NtColumnDirective) _contentColumns: QueryList<NtColumnDirective>;

  @Output() readonly sortChange: EventEmitter<NtColumnSortChange | NtColumnSortChange[]> = new EventEmitter();

  constructor(
    private _ngZone: NgZone,
    protected _differs: IterableDiffers,
    protected _changeDetectorRef: ChangeDetectorRef,
    protected _coalescedStyleScheduler: _CoalescedStyleScheduler,
    protected _elementRef: ElementRef,
    @Attribute('role') role: string,
    @Optional() protected readonly _dir: Directionality,
    @Inject(DOCUMENT) _document: any,
    _platform: Platform) {
    super(_differs, _changeDetectorRef, _coalescedStyleScheduler, _elementRef, role, _dir, _document, _platform);
  }

  ngAfterContentInit() {
    this._contentColumns.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._changeDetectorRef.markForCheck();
    });

    this.columSortChanges.pipe(takeUntil(this._destroy)).subscribe(change => {
      this._setSortValue(change.column, change.sort);
    });
    if (this.sort) {
      const [column, sort] = this.sort.split(':');
      if (column) {
        this._checkSortInputAndSetValue(column, sort);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.sort;
    if (change && !change.firstChange) {
      const currentValue = change.currentValue || '';
      const [column, sort] = currentValue.split(':');
      if (column) {
        this._checkSortInputAndSetValue(column, sort);
      } else {
        this._clearSort();
      }
    }
  }

  private _setSortValue(column: string, sort: string) {
    if (sort && ['asc', 'desc'].includes(sort)) {
      this._sort = `${column}:${sort}`;
    } else {
      this._sort = '';
    }
  }

  private _checkSortInputAndSetValue(column: string, sort: string) {
    const findColumn = this._contentColumns.find(col => col.name === column);
    if (findColumn) {
      findColumn.sort = sort as NtColumnSort;
    }
  }

  private _clearSort(filter?: NtColumnSortChange) {
    this._contentColumns
      .filter(column => column.name !== (filter ? filter.column : ''))
      .forEach(column => column.sort = NtColumnSort.NONE);
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
      .subscribe(() => this._changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    super.ngOnDestroy();
  }
}
