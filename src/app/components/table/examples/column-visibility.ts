import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-table-column-visibility',
  template: `
  <nt-checkbox-group [(ngModel)]="displayedColumns">
    <nt-checkbox *ngFor="let column of columns" [value]="column.field">
      {{ column.text }}
    </nt-checkbox>
  </nt-checkbox-group>

  <nt-table [dataSource]="dataSource">
    <nt-column [name]="column.field" *ngFor="let column of columns">
      <nt-column-header *ntColumnHeaderDef>{{ column.text }}</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item[column.field] }}</nt-column-cell>
    </nt-column>

    <nt-header-row *ntHeaderRowDef="displayedColumns"></nt-header-row>
    <nt-row *ntRowDef="let row; columns: displayedColumns;"></nt-row>
  </nt-table>
  `
})
export class ExampleTableColumnVisibilityComponent implements OnInit {

  visible = false;

  dataSource = [
    { id: 1, name: '张三', age: 20, address: '北京' },
    { id: 2, name: '李四', age: 22, address: '上海' },
    { id: 3, name: '王五', age: 18, address: '广州' },
    { id: 4, name: '赵六', age: 27, address: '大连' }
  ];

  columns = [
    { field: 'name', visible: true, text: '名称' },
    { field: 'age', visible: true, text: '年龄' },
    { field: 'address', visible: false, text: '地址' }
  ];

  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = this.columns
      .filter(col => col.visible)
      .map(col => col.field);
  }
}
