import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtExampleModule } from '@ng-tangram/example';

import { DatePickerDocumentComponent } from './datepicker.component';
import { ExampleDatePickerBasicComponent } from './examples/basic';
import { ExampleDatePickerFormsComponent } from './examples/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtDatePickerModule,
    NtExampleModule,
    NtFormsModule,
    RouterModule.forChild([
      { path: '', component: DatePickerDocumentComponent }
    ])
  ],
  declarations: [DatePickerDocumentComponent, ExampleDatePickerBasicComponent, ExampleDatePickerFormsComponent]
})
export class DatePickerDocumentModule { }
