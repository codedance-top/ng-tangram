import { InjectionToken, EventEmitter } from '@angular/core';
export declare class NtColumnSortChange {
    isUserInput: boolean;
    column: string;
    sort: string;
    constructor(isUserInput: boolean, column: string, sort: string);
}
export interface NtColumn {
    sort: '' | 'asc' | 'desc';
    sortable: boolean;
    sorting: (isUserInput: boolean) => void;
    sortChange: EventEmitter<NtColumnSortChange>;
    visibled: boolean;
}
export interface NtColumnTable {
}
export declare const NT_COLUMN: InjectionToken<NtColumn>;
export declare const NT_COLUMN_TABLE: InjectionToken<NtColumnTable>;
