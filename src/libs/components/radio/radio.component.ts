import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Attribute, Component, EventEmitter, Input, Optional, Output, Self, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

let uniqueId = 0;

export class NtRadioChange<T> {
  constructor(
    public source: NtRadioComponent<T>,
    public selected: boolean) { }
}

@Component({
  selector: 'nt-radio',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'radio.component.html',
  host: {
    'class': 'nt-radio',
    '[class.nt-radio-disabled]': 'disabled'
  }
})
export class NtRadioComponent<T> implements ControlValueAccessor {

  readonly id: string = `nt-radio-${uniqueId++}`;

  private _value: T | null;

  private _disabled = false;
  private _readonly = false;
  private _checked = false;
  private _name: string = this.id;

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

  @Input()
  set name(value: string) { this._name = value; }
  get name(): string { return this._name; }

  @Output() readonly change = new EventEmitter<NtRadioChange<T>>();

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
  }

  _onInputChange(event: Event) {
    event.stopPropagation();
    this._checked = true;
    this._emitChangeEvent();
  }

  private _emitChangeEvent() {
    const event = new NtRadioChange(this, this.checked);
    this._onChange(this.checked);
    this._onTouched();
    this.change.emit(event);
  }
}
