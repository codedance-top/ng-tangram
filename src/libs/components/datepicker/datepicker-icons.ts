import { InjectionToken } from '@angular/core';

export interface NtDatePickerIcons {
  caret: string;
  clear: string;
}

export const NT_DATEPICKER_ICONS = new InjectionToken<NtDatePickerIcons>('nt-datepicker-icons');
