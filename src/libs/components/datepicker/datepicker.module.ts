import { NtDatePickerCalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtNativeDateModule, NtOverlayModule } from '@ng-tangram/components/core';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';

import { NtDatePickerComponent } from './datepicker.component';
import { NtDatePickerMonthComponent } from './month.component';
import { NtDatePickerMultiYearComponent } from './multi-year.component';
import { NtDatePickerYearComponent } from './year.component';

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtTooltipModule, NtNativeDateModule],
  exports: [NtDatePickerComponent, NtTooltipModule],
  declarations: [
    NtDatePickerComponent,
    NtDatePickerCalendarComponent,
    NtDatePickerMonthComponent,
    NtDatePickerYearComponent,
    NtDatePickerMultiYearComponent
  ]
})
export class NtDatePickerModule { }
