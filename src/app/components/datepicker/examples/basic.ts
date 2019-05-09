import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NtDatePickerComponent } from '@ng-tangram/components/datepicker';

@Component({
  selector: 'example-datepicker-basic',
  template: `
    <nt-radio-group [(ngModel)]="status">
      <nt-radio value="normal">正常</nt-radio>
      <nt-radio value="disabled">禁用</nt-radio>
    </nt-radio-group>
    <nt-datepicker #datepicker
      placeholder="开始日期"
      [(ngModel)]="startDate"
      disabled="{{status === 'disabled'}}">
    </nt-datepicker>
    <button nt-button class="button" (click)="clear()">Clear</button>
  `
})
export class ExampleDatePickerBasicComponent {
  @ViewChild('datepicker') datepicker: NtDatePickerComponent<Date>;

  startDate = new Date(2012, 5, 20);
  status: string = 'normal'

  clear() {
    this.datepicker.clear();
  }

}
