import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Attribute, Component, EventEmitter, Input, Optional, Output, Self, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

let uniqueId = 0;

export class NtCheckboxChange<T> {
  constructor(
    public source: NtCheckboxComponent<T>,
    public checked: boolean) { }
}

@Component({
  selector: 'nt-checkbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'checkbox.component.html',
  providers: [
    { provide: NtFormFieldControl, useExisting: NtCheckboxComponent }
  ],
  host: {
    'class': 'nt-checkbox',
    '[class.disabled]': 'disabled'
  }
})
export class NtCheckboxComponent<T> implements ControlValueAccessor {

  readonly id: string = `nt-checkbox-${uniqueId++}`;

  private _value: T | null;

  private _disabled = false;
  private _readonly = false;

  private _checked = false;

  tabIndex: number;

  @Input()
  set value(value: T | null) { this._value = value; }
  get value() { return this._value; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  get readonly() { return this._readonly; }

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) { this._checked = coerceBooleanProperty(value); }

  @Output() readonly change = new EventEmitter<NtCheckboxChange<T>>();

  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  constructor(
    @Attribute('tabindex') tabIndex: string,
    @Self() @Optional() public ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.tabIndex = parseInt(tabIndex) || 0;
  }

  writeValue(value: T) {
    this._checked = !!value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  _onInputClick(event: Event) {
    event.stopPropagation();
    if (!this.disabled) {
      this._checked = !this._checked;
      this._onTouched();
      this._emitChangeEvent();
    }
  }

  _onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  private _emitChangeEvent() {
    const event = new NtCheckboxChange(this, this.checked);
    this._onChange(this.checked);
    this.change.emit(event);
  }
}
