import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtPseudoInputModule } from '@ng-tangram/components/core';
import { NtOverlayModule  } from '@ng-tangram/components/overlay';

import { NtDatePickerCalendarComponent } from './calendar.component';
import { NtDatePickerComponent } from './datepicker.component';
import { NtDatePickerMonthComponent } from './month.component';
import { NtDatePickerMultiYearComponent } from './multi-year.component';
import { NtDatePickerYearComponent } from './year.component';

@NgModule({
  imports: [
    CommonModule,
    NtOverlayModule,
    NtPseudoInputModule,
  ],
  exports: [NtDatePickerComponent],
  declarations: [
    NtDatePickerComponent,
    NtDatePickerCalendarComponent,
    NtDatePickerMonthComponent,
    NtDatePickerYearComponent,
    NtDatePickerMultiYearComponent
  ]
})
export class NtDatePickerModule { }
