import { Component, ViewChild } from '@angular/core';
import { NtDatePicker } from '@ng-tangram/components/datepicker';

@Component({
  selector: 'example-datepicker-basic',
  template: `
    <nt-radio-group [(ngModel)]="disabled">
      <nt-radio [value]="false">正常</nt-radio>
      <nt-radio [value]="true">禁用</nt-radio>
    </nt-radio-group>
    <nt-datepicker #datepicker
      placeholder="开始日期"
      [(ngModel)]="startDate"
      [disabled]="disabled">
    </nt-datepicker>
  `
})
export class ExampleDatePickerBasicComponent {

  @ViewChild('datepicker', { static: true }) datepicker: NtDatePicker<Date>;

  startDate = new Date(2012, 5, 20);

  disabled = false;
}
