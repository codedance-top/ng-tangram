import { Subject, Subscription } from 'rxjs';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';
import { DateAdapter } from '@ng-tangram/components/core';

import { DateFilterFn } from './datepicker-control';
import { ExtractDateTypeFromSelection, NtDateSelectionModel } from './selections';

@Directive()
export abstract class NtDatePickerInputBase<S, D = ExtractDateTypeFromSelection<S>>
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  ngControl: NgControl | null;

  private _value: D | null;

  get value(): D | null {
    return this._model
      ? this._getValueFromModel(this._model.selection)
      : this._value;
  }
  set value(value: D | null) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = this._isValidValue(value);
    value = this._dateAdapter.getValidDateOrNull(value);
    const oldDate = this.value;
    this._assignValue(value);

    if (!this._dateAdapter.sameDate(oldDate, value)) {
      this._valueChange(value);
    }
  }

  private _disabled = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _required = false;

  @Input()
  get required(): boolean {
    if (this.ngControl?.control?.validator) {
      const control = new FormControl();
      const validateResult = this.ngControl.control.validator(control);
      return validateResult && validateResult.hasOwnProperty("required");
    }
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  protected _lastValueValid = false;

  protected _model: NtDateSelectionModel<S, D>;

  protected abstract _validator: ValidatorFn | null;
  protected abstract _assignValueToModel(value: D | null): void;
  protected abstract _getValueFromModel(modelValue: S): D | null;

  /** Gets the minimum date for the input. Used for validation. */
  abstract _getMinDate(): D | null;

  /** Gets the maximum date for the input. Used for validation. */
  abstract _getMaxDate(): D | null;

  /** Gets the date filter function. Used for validation. */
  protected abstract _getDateFilter(): DateFilterFn<D> | undefined;

  private _onChange: (value: any) => void = () => {};

  _onTouched = () => {};

  _validatorOnChange = () => {};

  readonly stateChanges = new Subject<void>();

  private _valueChangesSubscription = Subscription.EMPTY;
  private _localeSubscription = Subscription.EMPTY;

  constructor(
    protected _dateAdapter: DateAdapter<D>) {

    // Update the displayed date when the locale changes.
    this._localeSubscription = _dateAdapter.localeChanges.subscribe(() => {
      this.value = this.value;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._valueChangesSubscription.unsubscribe();
    this._localeSubscription.unsubscribe();
    this.stateChanges.complete();
  }

  writeValue(value: D) {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** @docs-private */
  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  /** @docs-private */
  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null;
  }

  _valueChange(value: D | null) {
    this._onChange(value);
  }

  _registerModel(model: NtDateSelectionModel<S, D>): void {
    this._model = model;
    this._valueChangesSubscription.unsubscribe();

    if (this._value) {
      this._assignValue(this._value);
    }

    this._valueChangesSubscription = this._model.selectionChanged.subscribe(
      (event) => {
        if (event.source !== this) {
          const value = this._getValueFromModel(event.selection);
          this._lastValueValid = this._isValidValue(value);
          this._valueChange(value);
          this._onTouched();
        }
      }
    );
  }

  /** Assigns a value to the model. */
  private _assignValue(value: D | null) {
    if (this._model) {
      this._assignValueToModel(value);
      this._value = null;
    } else {
      this._value = value;
    }
  }

  /** Whether a value is considered valid. */
  private _isValidValue(value: D | null): boolean {
    return !value || this._dateAdapter.isValid(value);
  }

  /** The form control validator for whether the input parses. */
  private _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._lastValueValid ?
        null : {'ntDatePickerParse': {'text': this.value}};
  }

  /** The form control validator for the date filter. */
  private _filterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controlValue = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(control.value)
    );
    const dateFilter = this._getDateFilter();
    return !dateFilter || !controlValue || dateFilter(controlValue)
      ? null
      : { ntDatePickerFilter: true };
  };

  /** The form control validator for the min date. */
  private _minValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controlValue = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(control.value)
    );
    const min = this._getMinDate();
    return !min ||
      !controlValue ||
      this._dateAdapter.compareDate(min, controlValue) <= 0
      ? null
      : { ntDatePickerMin: { min: min, actual: controlValue } };
  };

  /** The form control validator for the max date. */
  private _maxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const controlValue = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(control.value)
    );
    const max = this._getMaxDate();
    return !max ||
      !controlValue ||
      this._dateAdapter.compareDate(max, controlValue) >= 0
      ? null
      : { ntDatePickerMax: { max: max, actual: controlValue } };
  };

  /** Gets the base validator functions. */
  protected _getValidators(): ValidatorFn[] {
    return [
      this._parseValidator,
      this._minValidator,
      this._maxValidator,
      this._filterValidator,
    ];
  }
}
