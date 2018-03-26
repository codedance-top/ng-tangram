import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NT_FORM_CONFIG, NtFormConfig } from '@ng-tangram/components/forms/invalid-handler';

import { NtFormAutofocusDirective } from './form-autofocus.directive';
import { NtFormFieldComponent } from './form-field.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, NtFormFieldComponent, NtFormAutofocusDirective],
  providers: [
    { provide: NT_FORM_CONFIG, useClass: NtFormConfig }
  ],
  declarations: [NtFormFieldComponent, NtFormAutofocusDirective],
})
export class NtFormsModule { }
