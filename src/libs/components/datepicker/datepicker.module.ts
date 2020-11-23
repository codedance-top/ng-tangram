import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtPseudoInputModule } from '@ng-tangram/components/core';
import { NtOverlayModule } from '@ng-tangram/components/overlay';

import { NtCalendarBody } from './calendar-body.component';
import { NtCalendarHeader } from './calendar-header.component';
import { NtDatePickerCalendar } from './calendar.component';
import { NtDateRangeEnd, NtDateRangeStart } from './date-range-parts.directive';
import { NtDateRangePicker } from './date-range-picker.component';
import { NtDatePickerContent } from './datepicker-content.component';
import { NtDatePicker } from './datepicker.component';
import { NtCalendarMonth } from './month.component';
import { NtCalendarMultiYear } from './multi-year.component';
import { NtCalendarYear } from './year.component';

@NgModule({
  imports: [
    CommonModule,
    A11yModule,
    PortalModule,
    NtOverlayModule,
    NtPseudoInputModule,
  ],
  exports: [
    NtDatePicker,
    NtDateRangePicker,
    NtDateRangeStart,
    NtDateRangeEnd
  ],
  declarations: [
    NtDatePicker,
    NtDatePickerContent,
    NtDatePickerCalendar,
    NtCalendarBody,
    NtCalendarHeader,
    NtCalendarMonth,
    NtCalendarYear,
    NtCalendarMultiYear,
    NtDateRangePicker,
    NtDateRangeStart,
    NtDateRangeEnd
  ]
})
export class NtDatePickerModule { }
