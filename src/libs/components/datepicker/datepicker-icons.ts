import { InjectionToken } from '@angular/core';

export interface NtDatePickerIcons {
  caret: string;
  clear: string;
}

export const DEFAULT_DATEPICKER_ICONS: NtDatePickerIcons = {
  caret: 'far fa-calendar-alt',
  clear: 'fa fa-times'
};

export const NT_DATEPICKER_ICONS = new InjectionToken<NtDatePickerIcons>('nt-datepicker-icons');
