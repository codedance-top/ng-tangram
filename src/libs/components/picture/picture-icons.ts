import { InjectionToken } from '@angular/core';

export interface NtPictureIcons {
  add: string;
  preview: string;
  remove: string;
}

export const NT_PICTURE_ICONS = new InjectionToken<NtPictureIcons>('nt-picture-icons');
