import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtNativeDateModule, NtOverlayModule } from '@ng-tangram/components/core';

import { NtDatePickerCalendarComponent } from './calendar.component';
import {
  NT_DATEPICKER_ICONS, NtDatePickerIcons
} from './datepicker-icons';
import { NtDatePickerComponent } from './datepicker.component';
import { NtDatePickerMonthComponent } from './month.component';
import { NtDatePickerMultiYearComponent } from './multi-year.component';
import { NtDatePickerYearComponent } from './year.component';

const DEFAULT_DATEPICKER_ICONS: NtDatePickerIcons = {
  caret: 'far fa-calendar-alt',
  clear: 'fa fa-times'
};

@NgModule({
  imports: [CommonModule, NtOverlayModule, NtNativeDateModule],
  exports: [NtDatePickerComponent],
  declarations: [
    NtDatePickerComponent,
    NtDatePickerCalendarComponent,
    NtDatePickerMonthComponent,
    NtDatePickerYearComponent,
    NtDatePickerMultiYearComponent
  ],
  providers: [
    { provide: NT_DATEPICKER_ICONS, useValue: DEFAULT_DATEPICKER_ICONS }
  ]
})
export class NtDatePickerModule {
  public static forRoot(icons?: NtDatePickerIcons): ModuleWithProviders {
    return {
      ngModule: NtDatePickerModule,
      providers: [
        { provide: NT_DATEPICKER_ICONS, useValue: icons || DEFAULT_DATEPICKER_ICONS }
      ]
    };
  }
}
