import {
  AfterContentInit, ContentChildren, Directive, Input, OnChanges, QueryList, Optional
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupName, NgForm, FormGroupDirective, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/operators/merge';

import { NtFormFieldControl } from './form-field-control';
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
      const field = this.fields.find(field => field.control.ngControl && field.control.ngControl.invalid);
      if (field && field.control) {
        field.control.focus();
      }
    }
  }
}
