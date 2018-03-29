import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NtFormAutofocusDirective } from './form-autofocus.directive';
import { NtFormErrorPipe } from './form-error.pipe';
import { NtFormFieldComponent } from './form-field.component';
import { NtFormValidationTransformer, NT_VALIDATION_TRANSFOMER } from './validation';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
  providers: [
    { provide: NT_VALIDATION_TRANSFOMER, useClass: NtFormValidationTransformer }
  ],
  declarations: [NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
})
export class NtFormsModule { }
