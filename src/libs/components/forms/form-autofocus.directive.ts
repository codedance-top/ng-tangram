import { ContentChildren, Directive, Optional, QueryList } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgForm } from '@angular/forms';

import { NtFormFieldComponent } from './form-field.component';

@Directive({
  selector: 'form[ntFormAutofocus]',
  host: {
    '(submit)': 'onSubmit($event)'
  }
})
export class NtFormAutofocusDirective {

  _form: ControlContainer;

  @ContentChildren(NtFormFieldComponent) fields: QueryList<NtFormFieldComponent>;

  constructor(@Optional() form: NgForm, @Optional() formGroup: FormGroupDirective) {
    this._form = form || formGroup;
  }

  onSubmit() {
    if (this._form.invalid) {
      const field = this.fields.find(field => !!field.ngControl && !!field.ngControl.invalid);
      if (field && field.control) {
        field.control.focus();
      }
    }
  }
}
