import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-basic',
  template: `
    <nt-pagination [ntTotal]="100" [ntPageIndex]="pageIndex" [ntPageSize]="20"></nt-pagination>
  `
})
export class DemoPaginationBasicComponent {
  pageIndex = 1;
}
