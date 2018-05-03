import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'demo-pagination-basic',
  template: `
    <nt-pagination [total]="total" [pageIndex]="no" [pageSize]="size"></nt-pagination>
  `
})
export class DemoPaginationBasicComponent implements OnInit {
  // pageIndex = 1;
  total = 0;
  // pageSize = 10;

  no = 1;
  size = 10;

  ngOnInit() {
    setTimeout(() => {
      this.total = 16;
    }, 500);
  }
}
