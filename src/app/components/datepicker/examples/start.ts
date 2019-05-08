import { Component } from '@angular/core';

@Component({
  selector: 'example-datepicker-start',
  template: `
    <nt-datepicker placeholder="默认年月" [startAt]="startDate"></nt-datepicker>
  `
})
export class ExampleDatePickerStartComponent {
  startDate = new Date(2019, 10, 1);
}
