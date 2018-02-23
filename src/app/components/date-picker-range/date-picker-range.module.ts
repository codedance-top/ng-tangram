
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { DatePickerRangeDocumentComponent } from './date-picker-range.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: DatePickerRangeDocumentComponent }
    ])],
  exports: [DatePickerRangeDocumentComponent],
  declarations: [DatePickerRangeDocumentComponent],
})
export class DatePickerRangeDocumentModule { }
  