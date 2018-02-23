
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { TimePickerDocumentComponent } from './time-picker.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: TimePickerDocumentComponent }
    ])],
  exports: [TimePickerDocumentComponent],
  declarations: [TimePickerDocumentComponent],
})
export class TimePickerDocumentModule { }
  