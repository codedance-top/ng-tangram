import { InjectionToken } from '@angular/core';

export class NtPaginationConfig {
  previousLabel?: string = '上一页';
  nextLabel?: string = '下一页';
  size?: number = 3;
  pageSize?: number = 10;
}

export const NT_PAGINATION_CONFIG = new InjectionToken<NtPaginationConfig>('nt-pagination-config');
