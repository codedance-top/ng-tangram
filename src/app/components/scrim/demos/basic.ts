import { Component } from '@angular/core';

@Component({
  selector: 'demo-scrim-basic',
  template: `
  <nt-table [ntScrim]="isOpen" ntScrimText="正在加载中..." [ntDataSource]="dataSource">

    <nt-column ntColumnKey="name">
      <nt-column-header>Name</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.name }}</nt-column-cell>
    </nt-column>

    <nt-column ntColumnKey="age">
      <nt-column-header>Age</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.age }}</nt-column-cell>
    </nt-column>

    <nt-column ntColumnKey="address">
      <nt-column-header>Address</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.address }}</nt-column-cell>
    </nt-column>

  </nt-table>
  <nt-pagination [ntTotal]="300" [ntPageIndex]="pageIndex" [ntPageSize]="20" (ntOnPageChange)="onPageChange($event)"></nt-pagination>
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
