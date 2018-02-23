
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NtFormFieldComponent } from './form-field.component';
import { NtFormAutofocusDirective } from './form-autofocus.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NtFormFieldComponent, NtFormAutofocusDirective],
  declarations: [NtFormFieldComponent, NtFormAutofocusDirective],
})
export class NtFormsModule { }
