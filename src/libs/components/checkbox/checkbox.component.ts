import { Component, EventEmitter, OnInit, Optional, Self, ViewEncapsulation, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let uniqueId = 0;

@Component({
  selector: 'nt-checkbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'checkbox.component.html',
  providers: [
    { provide: NtFormFieldControl, useExisting: NtCheckboxComponent }
  ],
  host: {
    'class': 'nt-checkbox'
  }
})
export class NtCheckboxComponent<T> extends NtFormFieldControl<T>  implements  ControlValueAccessor {

  readonly id: string = `nt-checkbox-${uniqueId++}`;

  private _value: T | null;

  private _disabled = false;
  private _readonly = false;
  private _required = false;

  private _checked = false;

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  @Input()
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  get readonly() { return this._readonly; }

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    this._checked = coerceBooleanProperty(value);
  }

  /** Emits when the value changes (either due to user input or programmatic change). */
  private _valueChange = new EventEmitter<T | null>();
  private _onChange: (value: any) => void = () => {};
  private _onTouched = () => {};

  constructor(
    @Self() @Optional() public ngControl: NgControl
  ) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: T) {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }
}
