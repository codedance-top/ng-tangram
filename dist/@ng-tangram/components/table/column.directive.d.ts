import { AfterContentInit, ElementRef, EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import { NtColumn, NtColumnSortChange, NtColumnTable } from './column';
export declare class NtColumnHeaderDirective {
    elementRef: ElementRef;
    column: NtColumn;
    constructor(elementRef: ElementRef, column: NtColumn);
}
export declare class NtColumnCellDirective {
}
export declare class NtColumnCellDefDirective {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
export declare class NtColumnComponent implements NtColumn, AfterContentInit {
    private _table;
    private _viewContainerRef;
    private _elementRef;
    private _sortable;
    sort: '' | 'asc' | 'desc';
    visibled: boolean;
    sortable: boolean;
    readonly text: any;
    name: string;
    width: number | string;
    align: 'left' | 'center' | 'right';
    template: TemplateRef<any>;
    header: NtColumnHeaderDirective;
    cell: NtColumnCellDefDirective;
    readonly sortChange: EventEmitter<NtColumnSortChange>;
    constructor(_table: NtColumnTable, _viewContainerRef: ViewContainerRef, _elementRef: ElementRef);
    /** 排序操作 */
    sorting(isUserInput?: boolean): void;
    ngAfterContentInit(): void;
}
