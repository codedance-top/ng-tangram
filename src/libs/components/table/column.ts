import { InjectionToken, EventEmitter } from '@angular/core';

export class NtColumnSortChange {
  constructor(public isUserInput = false, public column: string, public sort: string) {}
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

export const NT_COLUMN = new InjectionToken<NtColumn>('nt-column');

export const NT_COLUMN_TABLE = new InjectionToken<NtColumnTable>('nt-column-table');
