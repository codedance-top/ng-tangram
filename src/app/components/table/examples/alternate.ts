


import { Component } from '@angular/core';

@Component({
  selector: 'example-table-alternate',
  template: `
  <nt-table [dataSource]="dataSource">
    <nt-column name="name">
      <nt-header-cell *ntHeaderCellDef>名称</nt-header-cell>
      <nt-cell *ntCellDef="let item">{{ item.name }}</nt-cell>
    </nt-column>

    <nt-column name="age">
      <nt-header-cell *ntHeaderCellDef>年龄</nt-header-cell>
      <nt-cell *ntCellDef="let item">{{ item.age }}</nt-cell>
    </nt-column>

    <nt-column name="address">
      <nt-header-cell *ntHeaderCellDef>地址</nt-header-cell>
      <nt-cell *ntCellDef="let item">{{ item.address }}</nt-cell>
    </nt-column>

    <nt-header-row *ntHeaderRowDef="displayedColumns"></nt-header-row>
    <nt-row *ntRowDef="let row; columns: displayedColumns;"></nt-row>
  </nt-table>
  `
})
export class ExampleTableAlternateComponent {

  dataSource = [
    { id: 1, name: '张三', age: 20, address: '北京' },
    { id: 2, name: '李四', age: 22, address: '上海' },
    { id: 3, name: '王五', age: 18, address: '广州' },
    { id: 4, name: '赵六', age: 27, address: '大连' }
  ];

  displayedColumns = ['name', 'age', 'address'];
}
