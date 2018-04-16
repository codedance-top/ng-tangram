

import { Component, OnInit, Directive, Input, ElementRef, Optional, Self } from '@angular/core';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[ntInput], textarea[ntInput]',
  host: {
    '(blur)': '_focusChanged(false)',
    '(focus)': '_focusChanged(true)',
  },
  providers: [
    { provide: NtFormFieldControl, useExisting: NtInputDirective }
  ]
})
export class NtInputDirective extends NtFormFieldControl<any> {

  private _disabled = false;
  private _width: number;
  private _value: any;
  private _type = 'text';
  private _readonly = false;
  private _required = false;

  _focused = false;

  @Input() placeholder = '';

  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._focused) {
      this._focused = false;
    }
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  @Input()
  set width(value: number) { this._width = value; }
  get width() { return this._width; }

  /** Input type of the element. */
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
      this._elementRef.nativeElement.type = this._type;
    }
  }

  @Input()
  get value(): string { return this._elementRef.nativeElement.value; }
  set value(value: string) {
    if (value !== this.value) {
      this._elementRef.nativeElement.value = value;
    }
  }

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }

  get empty(): boolean { return !this._elementRef.nativeElement.value && !this._isBadInput(); }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _platform: Platform,
    private _elementRef: ElementRef) { super();

    // console.log(this.ngControl && this.ngControl.validator);
  }

  focus() { this._elementRef.nativeElement.focus(); }

  _focusChanged(isFocused: boolean) {
    if (isFocused !== this._focused && !this.readonly) {
      this._focused = isFocused;
    }
  }

  protected _isBadInput() {
    const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

  /** Determines if the component host is a textarea. If not recognizable it returns false. */
  private _isTextarea() {
    const nativeElement = this._elementRef.nativeElement;
    const nodeName = this._platform.isBrowser ? nativeElement.nodeName : nativeElement.name;
    return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
  }
}
