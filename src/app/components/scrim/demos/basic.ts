import { Component } from '@angular/core';

@Component({
  selector: 'demo-scrim-basic',
  template: `
  <nt-table [ntScrim]="isOpen" scrimText="正在加载中..." [dataSource]="dataSource">

    <nt-column name="name">
      <nt-column-header *ntColumnHeaderDef>Name</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.name }}</nt-column-cell>
    </nt-column>

    <nt-column name="age">
      <nt-column-header *ntColumnHeaderDef>Age</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.age }}</nt-column-cell>
    </nt-column>

    <nt-column name="address">
      <nt-column-header *ntColumnHeaderDef>Address</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.address }}</nt-column-cell>
    </nt-column>

    <nt-header-row *ntHeaderRowDef="['name', 'age', 'address']"></nt-header-row>
    <nt-row *ntRowDef="let row; columns: ['name', 'age', 'address'];"></nt-row>
  </nt-table>
  <nt-pagination [total]="300" [pageIndex]="pageIndex" [pageSize]="20" (pageChange)="onPageChange($event)"></nt-pagination>
  `
})
export class DemoScrimBasciComponent {
  isOpen = false;
  dataSource = [
    {
      name: '张三',
      age: 20,
      address: '北京'
    },
    {
      name: '李四',
      age: 22,
      address: '上海'
    },
    {
      name: '王五',
      age: 18,
      address: '广州'
    },
    {
      name: '赵六',
      age: 27,
      address: '大连'
    }
  ];
  pageIndex = 1;

  onPageChange(index: number) {
    this.pageIndex = index;
    this.isOpen = true;
    setTimeout(_ => this.isOpen = false, 500);
  }
}
