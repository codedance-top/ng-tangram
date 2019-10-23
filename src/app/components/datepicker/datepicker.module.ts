import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DateAdapter,
  NativeDateAdapter,
  NT_DATE_FORMATS,
  NT_NATIVE_DATE_FORMATS,
  NtNativeDateModule
} from '@ng-tangram/components';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { DatePickerDocumentComponent } from './datepicker.component';
import { ExampleDatePickerBasicComponent } from './examples/basic';
import { ExampleDatePickerBoundaryComponent } from './examples/boundary';
import { ExampleDatePickerChangeComponent } from './examples/change';
import { ExampleDatePickerFilterComponent } from './examples/filter';
import { ExampleDatePickerFormsComponent } from './examples/forms';
import { ExampleDatePickerMomentModule } from './examples/moment.module';
import { ExampleDatePickerStartComponent } from './examples/start';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtMarkdownBlockModule,
    NtNativeDateModule,
    NtDatePickerModule,
    NtExampleModule,
    NtFormsModule,
    ExampleDatePickerMomentModule,
    NtRadioModule,
    RouterModule.forChild([
      { path: '', component: DatePickerDocumentComponent }
    ])
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: NT_DATE_FORMATS, useValue: NT_NATIVE_DATE_FORMATS }
  ],
  declarations: [
    DatePickerDocumentComponent,
    ExampleDatePickerBasicComponent,
    ExampleDatePickerBoundaryComponent,
    ExampleDatePickerStartComponent,
    ExampleDatePickerFilterComponent,
    ExampleDatePickerFormsComponent,
    ExampleDatePickerChangeComponent
  ]
})
export class DatePickerDocumentModule { }
