import { InjectionToken } from '@angular/core';

export interface NtSelectIcons {
  caret: string;
  clear: string;
}

export const DEFAULT_SELECT_ICONS: NtSelectIcons = {
  caret: 'fa fa-chevron-down',
  clear: 'fa fa-times'
};

export const NT_SELECT_ICONS = new InjectionToken<NtSelectIcons>('nt-select-icons');
