import { InjectionToken } from '@angular/core';

export interface NtSelectIcons {
  caret: string;
  clear: string;
}

export const NT_SELECT_ICONS = new InjectionToken<NtSelectIcons>('nt-select-icons');
