import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'example-pagination-basic',
  template: `
    <nt-pagination [total]="total" [pageIndex]="no" [pageSize]="size"></nt-pagination>
  `
})
export class ExamplePaginationBasicComponent implements OnInit {

  total = 16;
  no = 1;
  size = 10;

  ngOnInit() { }
}
