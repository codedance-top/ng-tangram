import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'example-pagination-more',
  template: `
<!--    <nt-pagination [total]="total" [pageIndex]="no" [pageSize]="size"></nt-pagination>-->
    <nt-pagination [total]="total" [pageIndex]="no" [pageSize]="size" (pageChange)="onPageChange($event)"></nt-pagination>
  `
})
export class ExamplePaginationMoreComponent implements OnInit {

  total = 500;
  no = 1;
  size = 10;

  ngOnInit() { }

  onPageChange(index: number) {
    console.log(index);
    this.no = index;
  }
}
