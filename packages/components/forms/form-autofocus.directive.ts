/**
 * 表单自动聚焦
 */

import { Directive, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupName } from "@angular/forms";

@Directive({
  selector: '[ntFormAutofocus][formGroup],[ntFormAutofocus][FormGroupName]'
})
export class NtFormAutofocusDirective {

  @Input('formGroup') form: FormGroup;

  @Input('ntFormInvalidEmit') emitError: 'ordered' | 'all' = 'all';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  @HostListener('submit')
  onSubmit() {
    if (!this.form.valid) {
      for (let key in this.form.controls) {
        if (!this.form.controls[key].valid) {
          if (this.emitError === 'ordered') {
            this.form.controls[key].patchValue(this.form.controls[key].value, { emitEvent: true });
          } else if (this.emitError === 'all') {
            this.form.patchValue(this.form.value, { emitEvent: true });
          }

          let element = this.elementRef.nativeElement.querySelector(`[formcontrolname=${key}]`);
          if (!!element) {
            element.focus();
            break;
          }
        }
      }
    }
  }
}
