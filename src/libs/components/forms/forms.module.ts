import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NtFormAutofocusDirective } from './form-autofocus.directive';
import { NtFormErrorPipe } from './form-error.pipe';
import { NtFormFieldComponent } from './form-field.component';
import { NtFormValidationTransformer, NT_VALIDATION_TRANSFOMER } from './form-validation';
import { NtValidationTransformer } from '@ng-tangram/components/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
  declarations: [NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
})
export class NtFormsModule {
  public static forRoot(transformer?: Type<NtValidationTransformer>): ModuleWithProviders {
    return {
      ngModule: NtFormsModule,
      providers: [
        { provide: NT_VALIDATION_TRANSFOMER, useClass: transformer || NtFormValidationTransformer }
      ]
    };
  }
}
