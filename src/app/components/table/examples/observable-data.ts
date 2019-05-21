import { Component, OnInit } from '@angular/core';
import { ObservableDataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'example-table-observable-data',
  template: `

  <nt-table [dataSource]="dataSource" [ntScrim]="loading">
    <nt-column [name]="column.field" *ngFor="let column of columns">
      <nt-column-header *ntColumnHeaderDef>{{ column.text }}</nt-column-header>
      <nt-column-cell *ntColumnCellDef="let item">{{ item[column.field] }}</nt-column-cell>
    </nt-column>

    <nt-header-row *ntHeaderRowDef="displayedColumns"></nt-header-row>
    <nt-row *ntRowDef="let row; columns: displayedColumns;"></nt-row>
  </nt-table>
  `
})
export class ExampleTableObservableDataComponent implements OnInit {

  dataSource = new Observable();
  loading = true;

  constructor(private observableDataService: ObservableDataService) {

    this.dataSource = this.observableDataService.getPersons();
    this.dataSource.subscribe(() => {
      this.loading = false;
    });

  }

  columns = [
    { field: 'name', visible: true, text: '名称' },
    { field: 'age', visible: true, text: '年龄' },
    { field: 'salary', visible: true, text: '薪水' }
  ];

  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = this.columns
      .filter(col => col.visible)
      .map(col => col.field);
  }
}
