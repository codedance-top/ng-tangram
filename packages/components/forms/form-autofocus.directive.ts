import {
  AfterContentInit, ContentChildren, Directive, ElementRef, HostListener, Input, OnChanges,
  QueryList, Renderer2, SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { NtFormFieldComponent } from './form-field.component';

@Directive({
  selector: '[ntFormAutofocus][formGroup],[ntFormAutofocus][FormGroupName]'
})
export class NtFormAutofocusDirective implements AfterContentInit, OnChanges {

  @Input('formGroup') form: FormGroup;
  @Input('ntFormInvalidEmit') emitError: 'ordered' | 'all' = 'all';
  @ContentChildren(NtFormFieldComponent) formFields: QueryList<NtFormFieldComponent>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngAfterContentInit() {

  }

  ngOnChanges(change: SimpleChanges) {

  }

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
