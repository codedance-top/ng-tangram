
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { DatePickerDocumentComponent } from './date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: DatePickerDocumentComponent }
    ])],
  exports: [DatePickerDocumentComponent],
  declarations: [DatePickerDocumentComponent],
})
export class DatePickerDocumentModule { }
  