import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NtColumnSortChange, NtColumnTable } from './column';
import { NtColumnComponent } from './column.directive';
export declare class NtTableComponent<T> implements NtColumnTable, AfterContentInit, OnChanges, OnDestroy {
    private _ngZone;
    private _changeDetectorRef;
    private _element;
    columnComponent: typeof NtColumnComponent;
    class: string;
    private _selectionModel;
    private _multipleSortable;
    private _selectable;
    private readonly _destroy;
    private _columns;
    readonly columns: NtColumnComponent[];
    dataSource: Array<T>;
    selectable: boolean;
    readonly selectedChange: EventEmitter<T | T[]>;
    readonly sortChange: EventEmitter<NtColumnSortChange | NtColumnSortChange[]>;
    readonly columSortChanges: Observable<NtColumnSortChange>;
    readonly isAllSelected: boolean;
    readonly selected: T[];
    constructor(_ngZone: NgZone, _changeDetectorRef: ChangeDetectorRef, _element: ElementRef);
    ngOnChanges(change: SimpleChanges): void;
    ngAfterContentInit(): void;
    selectAll(): void;
    select(item: T): void;
    checkSelected(item: T): boolean;
    private _clearSort(filter?);
    private _resetOptions();
    ngOnDestroy(): void;
}
