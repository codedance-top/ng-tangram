

import { Component, OnInit, Directive, Input, ElementRef, Optional, Self } from '@angular/core';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[ntInput], textarea[ntInput]'
})
export class NtInputDirective extends NtFormFieldControl<any> {

  private _disabled = false;

  private _focused = false;

  private _width: number;

  private _value: any;

  private _type = 'text';

  @Input() placeholder = '';

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

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

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _platform: Platform,
    private _elementRef: ElementRef) { super();

    }

  ngOnInit() { }

  /** Determines if the component host is a textarea. If not recognizable it returns false. */
  private _isTextarea() {
    const nativeElement = this._elementRef.nativeElement;
    const nodeName = this._platform.isBrowser ? nativeElement.nodeName : nativeElement.name;
    return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
  }
}
