import { InjectionToken } from '@angular/core';

export interface NtFileIcons {
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
}

export const DEFAULT_FILE_ICONS: NtFileIcons = {
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
};

export const NT_FILE_ICONS = new InjectionToken<NtFileIcons>('nt-file-icons');

export const NT_FILE_EXTENSIONS: { [key: string]: string } = {

  'rar': 'archive',
  'zip': 'archive',
  'cab': 'archive',
  'iso': 'archive',
  'jar': 'archive',
  '7z': 'archive',
  'tar': 'archive',
  'gz': 'archive',
  'bz2': 'archive',
  'z': 'archive',

  'jpg': 'image',
  'bmp': 'image',
  'eps': 'image',
  'gif': 'image',
  'mif': 'image',
  'miff': 'image',
  'png': 'image',
  'tif': 'image',
  'tiff': 'image',
  'svg': 'image',
  'wmf': 'image',
  'jpe': 'image',
  'jpeg': 'image',
  'dib': 'image',
  'ico': 'image',
  'tga': 'image',
  'cut': 'image',
  'pic': 'image',

  'wma': 'audio',
  'ra': 'audio',
  'ogg': 'audio',
  'mpc': 'audio',
  'm4a': 'audio',
  'aac': 'audio',
  'mpa': 'audio',
  'mp2': 'audio',
  'm1a': 'audio',
  'm2a': 'audio',
  'mp3': 'audio',
  'mid': 'audio',
  'midi': 'audio',
  'rmi': 'audio',
  'mka': 'audio',
  'ac3': 'audio',
  'dts': 'audio',
  'cda': 'audio',
  'au': 'audio',
  'snd': 'audio',
  'aif': 'audio',
  'aifc': 'audio',
  'aiff': 'audio',

  'mp4': 'video',
  'avi': 'video',
  'wav': 'video',
  'wmv': 'video',
  'rmvb': 'video',
  'rm': 'video',
  'flv': 'video',
  'mkv': 'video',
  'mpg': 'video',
  'mpeg': 'video',
  'mov': 'video',
  '3gp': 'video',

  'doc': 'word',
  'docx': 'word',

  'xls': 'excel',
  'xlsx': 'excel',

  'ppt': 'ppt',
  'pptx': 'ppt'
};
