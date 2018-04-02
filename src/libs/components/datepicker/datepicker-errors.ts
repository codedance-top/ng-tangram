
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export function createMissingDateImplError(provider: string) {
  return Error(
      `NtDatepickerComponent: No provider found for ${provider}. You must import one of the following ` +
      `modules at your application root: NtNativeDateModule or provide a ` +
      `custom implementation.`);
}
