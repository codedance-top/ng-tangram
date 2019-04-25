/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NT_DATE_LOCALE } from '@ng-tangram/components/core';

import { MomentDateAdapter, NT_MOMENT_DATE_ADAPTER_OPTIONS } from './moment-date-adapter';
import { NT_MOMENT_DATE_FORMATS } from './moment-date-formats';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [NT_DATE_LOCALE, NT_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ],
})
export class MomentDateModule { }

@NgModule({
  imports: [MomentDateModule],
  providers: [
    { provide: NT_DATE_FORMATS, useValue: NT_MOMENT_DATE_FORMATS }
  ],
})
export class NtMomentDateModule { }
