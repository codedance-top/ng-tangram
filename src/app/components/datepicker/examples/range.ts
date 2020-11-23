import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "example-datepicker-range",
  template: `
    <nt-date-range-picker placeholder="开始日期">
      <nt-date-range-start [(ngModel)]="startDate"></nt-date-range-start>
      <nt-date-range-end [(ngModel)]="endDate"></nt-date-range-end>
    </nt-date-range-picker>

    <nt-date-range-picker placeholder="开始日期" [formGroup]="rangeGroup">
      <nt-date-range-start formControlName="start"></nt-date-range-start>
      <nt-date-range-end formControlName="end"></nt-date-range-end>
    </nt-date-range-picker>
  `,
})
export class ExampleDatePickerRangeComponent {

  startDate = new Date(2012, 5, 20);
  endDate = new Date(2013, 5, 20);

  rangeGroup = new FormGroup(
    {
      start: new FormControl(new Date(2012, 5, 20)),
      end: new FormControl(new Date(2013, 5, 20)),
    }
  );
}
