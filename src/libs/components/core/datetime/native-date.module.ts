/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { DateAdapter, NT_DATE_LOCALE_PROVIDER } from './date-adapter';
import { NT_DATE_FORMATS } from './date-formats';
import { NativeDateAdapter } from './native-date-adapter';
import { NT_NATIVE_DATE_FORMATS } from './native-date-formats';

@NgModule({
  imports: [PlatformModule],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    NT_DATE_LOCALE_PROVIDER
  ],
})
export class NativeDateModule { }

@NgModule({
  imports: [NativeDateModule],
  providers: [
    { provide: NT_DATE_FORMATS, useValue: NT_NATIVE_DATE_FORMATS }
  ],
})
export class NtNativeDateModule { }
