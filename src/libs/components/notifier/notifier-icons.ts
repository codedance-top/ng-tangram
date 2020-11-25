import { InjectionToken } from '@angular/core';

export interface NtNotifierIcons {
  info: string;
  success: string;
  warning: string;
  error: string;
  close: string;
}

export const DEFAULT_NOTIFIER_ICONS: NtNotifierIcons = {
  info: 'fas fa-info-circle',
  success: 'far fa-check-circle',
  warning: 'fas fa-exclamation-circle',
  error: 'far fa-times-circle',
  close: 'fas fa-times'
};

export const NT_NOTIFIER_ICONS = new InjectionToken<NtNotifierIcons>('nt-notifier-icons');
