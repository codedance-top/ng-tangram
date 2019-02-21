import { Component } from '@angular/core';

@Component({
  selector: 'example-datepicker-basic',
  template: `
    <nt-datepicker placeholder="开始日期" [(ngModel)]="startDate"></nt-datepicker>
    <br> {{ startDate | date: 'yyyy-MM-dd' }}
  `
})
export class ExampleDatePickerBasicComponent {
  startDate = new Date(2012, 5, 20);
}
