import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { NT_VALIDATION_TRANSFOMER, NtValidationTransformer } from './form-validation';

@Pipe({ name: 'formError' })
export class NtFormErrorPipe implements PipeTransform {
  constructor(@Inject(NT_VALIDATION_TRANSFOMER) private _transformer: NtValidationTransformer) { }

  transform(value: ValidationErrors, ...args: any[]) {
    return this._transformer.transform(value, ...args);
  }
}
