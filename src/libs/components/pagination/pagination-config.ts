import { InjectionToken } from '@angular/core';

export class NtPaginationConfig {
  previousLabel: string = '«';
  nextLabel: string = '»';
  itemSize: number = 2;
  pageSize: number = 10;
}

export const NT_PAGINATION_CONFIG = new InjectionToken<NtPaginationConfig>('nt-pagination-config');
