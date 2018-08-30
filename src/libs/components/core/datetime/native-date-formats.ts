/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NtDateFormats } from './date-formats';

export const NT_NATIVE_DATE_FORMATS: NtDateFormats = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    monthLabel: { month: 'short' },
    yearLabel: { month: 'numeric' }
  }
};
