import { EventEmitter } from '@angular/core';
import { NtPaginationConfig } from './pagination-config';
export declare const PAGINATION_ELLIPSIS = "...";
export declare class NtPaginationComponent {
    private _config;
    private _total;
    private _totalPage;
    private _pageIndex;
    private _pages;
    readonly config: NtPaginationConfig;
    readonly totalPage: number;
    readonly pages: number[];
    pageSize: number;
    previousLabel: string;
    nextLabel: string;
    total: number;
    pageIndex: number;
    pageChange: EventEmitter<number>;
    constructor(defaultConfig?: NtPaginationConfig);
    _pageChange(index: number): void;
    private _build();
}
