import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { NtFormAutofocusDirective } from './form-autofocus.directive';
import { NtFormErrorPipe } from './form-error.pipe';
import { NtFormFieldComponent } from './form-field.component';
import { NtFormLabelWidthDirective } from './form-label-width.directive';
import { NtFormOrientationDirective } from './form-orientation.directive';
import {
  NT_VALIDATION_TRANSFOMER,
  NtFormValidationTransformer,
  NtValidationTransformer
} from './form-validation';

@NgModule({
  imports: [CommonModule],
  exports: [
    NtFormFieldComponent,
    NtFormAutofocusDirective,
    NtFormLabelWidthDirective,
    NtFormOrientationDirective,
    NtFormErrorPipe
  ],
  declarations: [
    NtFormFieldComponent,
    NtFormAutofocusDirective,
    NtFormLabelWidthDirective,
    NtFormOrientationDirective,
    NtFormErrorPipe
  ]
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
