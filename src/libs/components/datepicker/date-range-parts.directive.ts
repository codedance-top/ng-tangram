

import { Directive, Inject, InjectFlags, InjectionToken, Injector, OnInit } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { DateAdapter } from '@ng-tangram/components/core';

import { DateFilterFn } from './datepicker-control';
import { NtDatePickerInputBase } from './datepicker-input-base';
import { DateRange } from './selections';

export interface NtDateRangePickerParent<D> {
  _startDate: NtDateRangePart<D>;
  _endDate: NtDateRangePart<D>;
  min: D | null;
  max: D | null;
  dateFilter: DateFilterFn<D> | undefined;
}

export const NT_DATE_RANGE_PICKER_PARENT =
    new InjectionToken<NtDateRangePickerParent<unknown>>('nt-date-range-parent');

/**
 * 日期范围选择器区间控制器基类
 */
@Directive()
export abstract class NtDateRangePart<D> extends NtDatePickerInputBase<DateRange<D>, D> implements OnInit {

  ngControl: NgControl | null;

  constructor(
    dateAdapter: DateAdapter<D>,
    @Inject(NT_DATE_RANGE_PICKER_PARENT) protected _rangePicker: NtDateRangePickerParent<D>,
    private _injector: Injector) {
    super(dateAdapter);
  }

  ngOnInit() {
    const ngControl = this._injector.get(NgControl, null, InjectFlags.Self);

    if (ngControl) {
      this.ngControl = ngControl;
    }
  }

  /** Gets the minimum date for the input. Used for validation. */
  _getMinDate() {
    return this._rangePicker.min;
  }

  /** Gets the maximum date for the input. Used for validation. */
  _getMaxDate() {
    return this._rangePicker.max;
  }

  /** Gets the date filter function. Used for validation. */
  protected _getDateFilter(): DateFilterFn<D> | undefined {
    return this._rangePicker.dateFilter;
  }
}

/**
 * 日期范围选择器的起始日期
 */
@Directive({
  selector: 'nt-date-range-start',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NtDateRangeStart, multi: true },
    { provide: NG_VALIDATORS, useExisting: NtDateRangeStart, multi: true }
  ],
})
export class NtDateRangeStart<D> extends NtDateRangePart<D> {

  /** Validator that checks that the start date isn't after the end date. */
  private _startValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(control.value));
    const end = this._model ? this._model.selection.end : null;
    return (!start || !end ||
        this._dateAdapter.compareDate(start, end) <= 0) ?
        null : {'ntDateRangeStartInvalid': {'end': end, 'actual': start}};
  }

  protected _assignValueToModel(value: D): void {
    if (this._model) {
      const range = new DateRange(value, this._model.selection.end);
      this._model.updateSelection(range, this);
      this._valueChange(value);
    }
  }
  protected _getValueFromModel(modelValue: DateRange<D>) {
    return modelValue.start;
  }

  protected _validator = Validators.compose([...super._getValidators(), this._startValidator]);
}

/**
 * 日期范围选择器的结束日期
 */
@Directive({
  selector: 'nt-date-range-end',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NtDateRangeEnd, multi: true },
    { provide: NG_VALIDATORS, useExisting: NtDateRangeEnd, multi: true }
  ],
})
export class NtDateRangeEnd<D> extends NtDateRangePart<D> {

  /** Validator that checks that the end date isn't before the start date. */
  private _endValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const end = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    const start = this._model ? this._model.selection.start : null;
    return (!end || !start ||
        this._dateAdapter.compareDate(end, start) >= 0) ?
        null : {'ntDateRangeEndInvalid': {'start': start, 'actual': end}};
  }

  protected _assignValueToModel(value: D): void {
    if (this._model) {
      const range = new DateRange(this._model.selection.start, value);
      this._model.updateSelection(range, this);
      this._valueChange(value);
    }
  }
  protected _getValueFromModel(modelValue: DateRange<D>) {
    return modelValue.end;
  }

  protected _validator = Validators.compose([...super._getValidators(), this._endValidator]);
}
