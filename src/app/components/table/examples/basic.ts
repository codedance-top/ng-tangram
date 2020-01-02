import { Component } from '@angular/core';

@Component({
  selector: 'example-table-basic',
  template: `

  <table nt-table [dataSource]="dataSource">
    <nt-column name="name">
      <th nt-header-cell *ntHeaderCellDef>名称</th>
      <td nt-cell *ntCellDef="let item">{{ item.name }}</td>
    </nt-column>

    <nt-column name="age">
      <th nt-header-cell *ntHeaderCellDef>年龄</th>
      <td nt-cell *ntCellDef="let item">{{ item.age }}</td>
    </nt-column>

    <nt-column name="address">
      <th nt-header-cell *ntHeaderCellDef>地址</th>
      <td nt-cell *ntCellDef="let item">{{ item.address }}</td>
    </nt-column>

    <tr nt-header-row *ntHeaderRowDef="displayedColumns"></tr>
    <tr nt-row *ntRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  `
})
export class ExampleTableBasicComponent {

  dataSource = [
    { id: 1, name: '张三', age: 20, address: '北京' },
    { id: 2, name: '李四', age: 22, address: '上海' },
    { id: 3, name: '王五', age: 18, address: '广州' },
    { id: 4, name: '赵六', age: 27, address: '大连' }
  ];

  displayedColumns = ['name', 'age', 'address'];
}
