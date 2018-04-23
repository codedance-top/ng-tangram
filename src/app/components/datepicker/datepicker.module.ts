import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NT_DATE_LOCALE } from '@ng-tangram/components/core';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtFormsModule } from '@ng-tangram/components/forms';
import { NtExampleModule } from '@ng-tangram/example';

import { DatePickerDocumentComponent } from './datepicker.component';
import { DemoDatePickerBasicComponent } from './demos/basic';
import { DemoDatePickerFormsComponent } from './demos/forms';

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
  declarations: [DatePickerDocumentComponent, DemoDatePickerBasicComponent, DemoDatePickerFormsComponent]
})
export class DatePickerDocumentModule { }
