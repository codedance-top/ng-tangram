import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { NtTableComponent } from '@ng-tangram/components/table';
import { NtColumnComponent } from '@ng-tangram/components/table';

@Component({
  selector: 'demo-table-basic',
  template: `

  <nt-table #table [dataSource]="dataSource">
    <nt-column name="name">
      <nt-column-header>名称</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.name }}</nt-column-cell>
    </nt-column>

    <nt-column name="age" align="center">
      <nt-column-header>年龄</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.age }}</nt-column-cell>
    </nt-column>

    <nt-column name="address" align="right">
      <nt-column-header>地址</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item.address }}</nt-column-cell>
    </nt-column>

  </nt-table>
  `
})
export class DemoTableBasicComponent implements AfterContentInit {

  visible = false;

  dataSource = [
    { id: 1, name: '张三', age: 20, address: '北京' },
    { id: 2, name: '李四', age: 22, address: '上海' },
    { id: 3, name: '王五', age: 18, address: '广州' },
    { id: 4, name: '赵六', age: 27, address: '大连' }
  ];

  // @ViewChild(NtTableComponent) table: NtTableComponent<any>;

  columns: NtColumnComponent[];

  constructor() {
    setTimeout(() => {
      this.dataSource.push({ id: 5, name: '赵六', age: 27, address: '大连' });
    }, 2000);
  }

  ngAfterContentInit() {
    // this.table._columns.changes.subscribe((columns) => {
    //   console.log(columns);
    // });
  }
}
