import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@modules/example/example.module';
import { NT_DATE_LOCALE } from '@ng-tangram/components/core';
import { NtDatePickerModule } from '@ng-tangram/components/datepicker';
import { NtFormsModule } from '@ng-tangram/components/forms';

import { DatePickerDocumentComponent } from './datepicker.component';
import { DemoDatePickerBasicComponent } from './demos/basic';
import { DemoDatePickerFormsComponent } from './demos/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
