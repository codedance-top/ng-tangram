import { NgControl } from '@angular/forms';

export abstract class NtFormFieldControl<T> {

  value: T | null;

  readonly placeholder: string;

  readonly ngControl: NgControl | null;

  readonly focused: boolean;

  readonly empty: boolean;

  readonly required: boolean;

  readonly disabled: boolean;

  focus(): void { }
}
