import { Subscription } from 'rxjs';

import { Directive, ElementRef, Input } from '@angular/core';

import { NtSliderChange, NtSliderComponent } from './slider.component';

@Directive({
  selector: 'input[type="number"][ntSliderInput]'
})
export class NtSliderInputDirective {

  private _connection: Subscription;

  private _input: HTMLInputElement;

  private _originalStep: any;

  private _originalMin: any;

  private _originalMax: any;

  private _slider: NtSliderComponent;

  @Input('ntSliderInput')
  get slider() { return this._slider; }
  set slider(value: NtSliderComponent) {
    this._slider = value;
    if (this._slider) {
      this._connect();
    } else {
      this._disconnect();
    }
  }

  constructor(element: ElementRef) {
    this._input = element.nativeElement;
  }

  private _connect() {
    this._connection = this.slider.input.subscribe(() => this._updateInputValue());
    this._coverOriginalAttributes();
    this._updateInputValue()
    this._input.addEventListener('change', this._onInputValueChange.bind(this));
    // this._input.addEventListener('blur', this._onInputBlur.bind(this));
  }

  private _disconnect() {
    this._connection?.unsubscribe();
    this._input.removeEventListener('change', this._onInputValueChange);
    // this._input.removeEventListener('blur', this._onInputBlur);
    this._restoreOriginalAttributes();
  }

  private _updateInputValue() {
    this._input.value = `${this.slider.displayValue}`;
  }

  private _onInputValueChange(_: Event) {
    const newValue = Number.parseFloat(this._input.value);
    this.slider.writeValue(newValue);
    this._updateInputValue();
    this._emitSliderChangeEvent();
  }

  // private _onInputBlur(_: Event) {
  //   const newValue = Number.parseFloat(this._input.value);
  //   this.slider.writeValue(newValue);
  //   this._updateInputValue();
  //   this._emitSliderChangeEvent();
  // }

  private _emitSliderChangeEvent() {
    this.slider.valueChange.emit(this.slider.value);
    this.slider.change.emit(this._createSliderChange());
  }

  private _createSliderChange() {
    const change = new NtSliderChange();
    change.source = this.slider;
    change.value = this.slider.value || 0;
    return change;
  }

  private _coverOriginalAttributes() {
    this._originalStep = this._input.step;
    this._originalMin = this._input.min;
    this._originalMax = this._input.max;

    this._input.step = `${this.slider.step}`;
    this._input.min = `${this.slider.min}`;
    this._input.max = `${this.slider.max}`;
  }

  private _restoreOriginalAttributes() {
    this._input.step = this._originalStep ;
    this._input.min = this._originalMin;
    this._input.max = this._originalMax;
  }
}
