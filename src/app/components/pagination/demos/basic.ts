import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-basic',
  template: `
    <nt-pagination [total]="100" [pageIndex]="pageIndex" [pageSize]="20"></nt-pagination>
  `
})
export class DemoPaginationBasicComponent {
  pageIndex = 1;
}
