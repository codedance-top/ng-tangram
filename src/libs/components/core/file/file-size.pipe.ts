import { Pipe, PipeTransform } from '@angular/core';

import { byteStringify } from './file-utils';

@Pipe({ name: 'filesize' })
export class NtFileSizePipe implements PipeTransform {

  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
      return '?';
    }

    return byteStringify(bytes, precision);
  }
}
