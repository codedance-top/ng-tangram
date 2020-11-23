import { PortalModule } from '@angular/cdk/portal';
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
} from '@ng-tangram/components/core';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtOverlayModule } from '@ng-tangram/components/overlay';
import { NtRadioModule } from '@ng-tangram/components/radio';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { DatePickerDocumentComponent } from './datepicker.component';
import { ExampleDatePickerBasicComponent } from './examples/basic';
import { ExampleDatePickerBoundaryComponent } from './examples/boundary';
import { ExampleDatePickerChangeComponent } from './examples/change';
import { ExampleDatePickerFilterComponent } from './examples/filter';
import { ExampleDatePickerFormsComponent } from './examples/forms';
import { ExampleDatePickerMomentModule } from './examples/moment.module';
import { ExampleDatePickerRangeComponent } from './examples/range';
import { ExampleDatePickerRangeStrategyComponent } from './examples/range-strategy';
import { ExampleDatePickerStartComponent } from './examples/start';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtMarkdownModule,
    NtNativeDateModule,
    NtDatePickerModule,
    NtExampleModule,
    NtFormsModule,
    NtDropdownModule,
    ExampleDatePickerMomentModule,
    NtRadioModule,
    NtOverlayModule,
    PortalModule,
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
    ExampleDatePickerChangeComponent,
    ExampleDatePickerRangeComponent,
    ExampleDatePickerRangeStrategyComponent
  ]
})
export class DatePickerDocumentModule { }
