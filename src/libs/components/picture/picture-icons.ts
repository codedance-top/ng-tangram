import { InjectionToken } from '@angular/core';

export interface NtPictureIcons {
  add: string;
  preview: string;
  remove: string;
}

export const DEFAULT_PICTURE_ICONS: NtPictureIcons = {
  add: 'fa fa-plus',
  preview: 'fa fa-search',
  remove: 'fa fa-trash-alt'
};

export const NT_PICTURE_ICONS = new InjectionToken<NtPictureIcons>('nt-picture-icons');
