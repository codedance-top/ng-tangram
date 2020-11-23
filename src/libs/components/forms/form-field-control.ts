import { Directive } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Directive()
export abstract class NtFormFieldControl<T> {

  value?: T | null;

  readonly placeholder?: string;

  readonly ngControl?: NgControl | null;

  readonly focused?: boolean;

  readonly empty?: boolean;

  readonly required?: boolean;

  readonly disabled?: boolean;

  getErrors?(): ValidationErrors | null;

  focus?(): void { }
}
