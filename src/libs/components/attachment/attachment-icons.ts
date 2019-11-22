import { InjectionToken } from '@angular/core';

export interface NtAttachmentIcons {
  default: string;
  archive: string;
  code: string;
  image: string;
  audio: string;
  video: string;
  pdf: string;
  word: string;
  excel: string;
  ppt: string;
  csv: string;
}

export const DEFAULT_ATTACHMENT_ICONS: NtAttachmentIcons = {
  default: 'far fa-file-alt',
  archive: 'far fa-file-archive',
  code: 'far fa-file-code',
  image: 'far fa-file-image',
  audio: 'far fa-file-audio',
  video: 'far fa-file-video',
  pdf: 'far fa-file-pdf',
  word: 'far fa-file-word',
  excel: 'far fa-file-excel',
  ppt: 'far fa-file-powerpoint',
  csv: 'far fa-file-csv',
};

export const NT_ATTACHMENT_ICONS = new InjectionToken<NtAttachmentIcons>('nt-attachment-icons');
