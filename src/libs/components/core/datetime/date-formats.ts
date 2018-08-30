/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { InjectionToken } from '@angular/core';

export type NtDateFormats = {
  parse: { dateInput: any },
  display: { dateInput: any, monthYearLabel: any, monthLabel: any, yearLabel: any }
};

export const NT_DATE_FORMATS = new InjectionToken<NtDateFormats>('nt-date-formats');
