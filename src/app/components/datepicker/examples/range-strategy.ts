import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WEEKLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER } from '@ng-tangram/components/datepicker';

@Component({
  selector: "example-datepicker-range-strategy",
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
  providers: [
    WEEKLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER
  ]
})
export class ExampleDatePickerRangeStrategyComponent {

  startDate = new Date();
  endDate = new Date();

  rangeGroup = new FormGroup(
    {
      start: new FormControl(),
      end: new FormControl(),
    }
  );
}
