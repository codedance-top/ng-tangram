

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  Self,
  ViewEncapsulation
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import {
  DateAdapter,
  fadeIn,
  fadeOut,
  NT_DATE_FORMATS,
  NtDateFormats
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import {
  NT_DATE_RANGE_PICKER_PARENT,
  NtDateRangeEnd,
  NtDateRangePickerParent,
  NtDateRangeStart
} from './date-range-parts.directive';
import { NtDatePickerBase } from './datepicker-base';
import { NT_DATE_PICKER_CONTROL } from './datepicker-control';
import { NT_DATEPICKER_ICONS, NtDatePickerIcons } from './datepicker-icons';
import {
  DateRange,
  NT_CALENDAR_RANGE_STRATEGY_PROVIDER,
  NT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
  NtDateSelectionModel
} from './selections';

let datepickerUid = 0;

@Component({
  selector: 'nt-date-range-picker',
  templateUrl: 'date-range-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-datepicker nt-date-range-picker',
    '(click)': '_onClick($event)',
  },
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.15)),
      transition('void => *', fadeIn(.15))
    ])
  ],
  providers: [
    { provide: NtFormFieldControl, useExisting: NtDateRangePicker },
    { provide: NT_DATE_PICKER_CONTROL, useExisting: NtDateRangePicker },
    { provide: NT_DATE_RANGE_PICKER_PARENT, useExisting: NtDateRangePicker },
    NT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
    NT_CALENDAR_RANGE_STRATEGY_PROVIDER
  ]
})
export class NtDateRangePicker<D> extends NtDatePickerBase<DateRange<D>, D>
  implements NtDateRangePickerParent<D>, NtFormFieldControl<DateRange<D>>, AfterContentInit, OnChanges {

  id: string = `nt-date-range-picker-${datepickerUid++}`;

  ngControl: NgControl | null;

  _displayValue = '';

  private _placeholder = '';

  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
  }

  private _disabled = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _required = false;

  @Input()
  get required(): boolean { return this._startDate.required || this._endDate.required || this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  private _readonly = false;

  @Input()
  get readonly() { return this._readonly; }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }

  @ContentChild(NtDateRangeStart) _startDate: NtDateRangeStart<D>;

  @ContentChild(NtDateRangeEnd) _endDate: NtDateRangeEnd<D>;

  constructor(
    elementRef: ElementRef,
    @Attribute('tabindex') tabIndex: string,
    @Optional() @Inject(NT_DATEPICKER_ICONS) icons: NtDatePickerIcons,
    @Inject(NT_DATE_FORMATS) dateFormats: NtDateFormats,
    changeDetectorRef: ChangeDetectorRef,
    dateAdapter: DateAdapter<D>,
    model: NtDateSelectionModel<DateRange<D>, D>,
    @Optional() @Self() control: ControlContainer) {
    super(elementRef, tabIndex, icons, dateFormats, changeDetectorRef, dateAdapter, model);

    this.ngControl = control as any;
  }

  ngAfterContentInit() {
    this._startDate._registerModel(this._model);
    this._endDate._registerModel(this._model);
  }

  _isActivated() {
    return !this.disabled;
  }

  _getStartValue() {
    return this._startDate?.value || this._endDate?.value;
  }

  getErrors() {
    return {
      ...this._startDate.ngControl?.errors,
      ...this._endDate.ngControl?.errors,
    };
  }

  protected _getValueFromModel(modelValue: DateRange<D>): D {
    return modelValue.start;
  }

  protected _formatValue(modelValue: DateRange<D>) {
    const startValue = this._formatPartValue(modelValue.start);
    const endValue = this._formatPartValue(modelValue.end);
    if (startValue || endValue) {
      this._displayValue = `${this._formatPartValue(modelValue.start)} - ${this._formatPartValue(modelValue.end)}`;
    } else {
      this._displayValue = '';
    }
  }

  protected _getDefaultModelValue() {
    return new DateRange(null, null);
  }

  private _formatPartValue(value: D) {
    return value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : ''
  }
}
