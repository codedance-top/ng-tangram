import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';
import { NtRadioModule } from '@ng-tangram/components/radio';

import { DatePickerDocumentComponent } from './datepicker.component';
import { ExampleDatePickerBasicComponent } from './examples/basic';
import { ExampleDatePickerStartComponent } from './examples/start';
import { ExampleDatePickerBoundaryComponent } from './examples/boundary';
import { ExampleDatePickerFilterComponent } from './examples/filter';
import { ExampleDatePickerChangeComponent } from './examples/change';
import { ExampleDatePickerFormsComponent } from './examples/forms';
import { ExampleDatePickerMomentModule } from './examples/moment.module';
import { NtNativeDateModule, DateAdapter, NativeDateAdapter, NT_DATE_FORMATS, NT_NATIVE_DATE_FORMATS } from '@ng-tangram/components';

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
