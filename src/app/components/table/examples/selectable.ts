import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';

@Component({
  selector: 'example-table-selectable',
  template: `

  <table nt-table [dataSource]="dataSource">
    <nt-column name="select">
      <th nt-header-cell *ntHeaderCellDef>
        <nt-checkbox
            (change)="masterToggle()"
            [checked]="selection.hasValue() && isAllSelected()">
        </nt-checkbox>
      </th>
      <td nt-cell *ntCellDef="let item">
      <nt-checkbox
      (click)="$event.stopPropagation()"
      (change)="$event ? selection.toggle(item) : null"
      [checked]="selection.isSelected(item)">
      </nt-checkbox>
      </td>
    </nt-column>


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
    <tr nt-row *ntRowDef="let row; columns: displayedColumns;" (click)="selection.toggle(row)"></tr>
  </table>
  <div>已选名称：{{selected}}</div>
  `
})
export class ExampleTableSelectableComponent {

  dataSource = [
    { id: 1, name: '张三', age: 20, address: '北京' },
    { id: 2, name: '李四', age: 22, address: '上海' },
    { id: 3, name: '王五', age: 18, address: '广州' },
    { id: 4, name: '赵六', age: 27, address: '大连' }
  ];

  displayedColumns = ['select', 'name', 'age', 'address'];

  selection = new SelectionModel<any>(true, []);
  selected: string = '';


  constructor() {
    this.selection.changed.subscribe((data) => {
      this.selected = (data.source.selected || []).map((item: any) => item.name).join(',');
    });
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :  this.dataSource.forEach(row => this.selection.select(row));
  }




}
