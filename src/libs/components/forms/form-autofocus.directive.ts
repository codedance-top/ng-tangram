import { AfterContentInit, ContentChildren, Directive, Optional, QueryList, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';

import { NtFormFieldComponent } from './form-field.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'form[ntFormAutofocus]'
})
export class NtFormAutofocusDirective implements AfterContentInit, OnDestroy {

  private _destory = new Subject();

  formContainer: NgForm | FormGroupDirective;

  @ContentChildren(NtFormFieldComponent, { descendants: true }) fields: QueryList<NtFormFieldComponent>;

  constructor(
    @Optional() form: NgForm,
    @Optional() formGroup: FormGroupDirective) {
    this.formContainer = form || formGroup;
  }

  ngAfterContentInit() {
    if (this.formContainer) {
      this.formContainer.ngSubmit
        .pipe(takeUntil(this._destory))
        .subscribe(() => {
          const field = this.fields.find(field => !!field.ngControl && !!field.ngControl.invalid);
          if (field && field.control) {
            field.control.focus();
          }
        });
    }
  }

  ngOnDestroy() {
    this._destory.next();
    this._destory.complete();
  }
}
