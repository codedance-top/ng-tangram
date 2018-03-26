import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter,
  Inject, Input, NgZone, Optional, Output, Renderer2, Self, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import {
  DateAdapter, NT_DATE_FORMATS, NtDateFormats, NtOverlayComponent
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { NtDatePickerCalendarComponent } from './calendar.component';

@Component({
  selector: 'nt-datepicker',
  templateUrl: 'datepicker.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-datepicker nt-form-control',
    '[class.open]': 'overlay.isOpen',
    'tabindex': '0'
  },
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.15)),
      transition('void => *', fadeIn(.15))
    ])
  ]
})
export class NtDatePickerComponent<D> extends NtFormFieldControl<D> implements ControlValueAccessor, AfterContentInit {

  readonly origin: OverlayOrigin;

  private _disabled = false;
  private _lastValueValid = false;
  private _value: D | null;
  private _startAt: D | null;
  private _minDate: D | null;
  private _maxDate: D | null;
  private _placeholder: string;

  get value(): D | null { return this._value; }
  set value(value: D | null) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = !value || this._dateAdapter.isValid(value);
    value = this._getValidDateOrNull(value);
    const oldDate = this.value;
    this._value = value;
    this.input.nativeElement.value = value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
  }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  get placeholder() { return this._placeholder || ''; }
  set placeholder(value: string) { this._placeholder = value || ''; }

  @Input('ntStartAt')
  get startAt(): D | null { return this._startAt || this.value; }
  set startAt(value: D | null) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input('ntMinDate')
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input('ntMaxDate')
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input('ntDateFilter') dateFilter: (date: D) => boolean;

  @ViewChild('input') input: ElementRef;
  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;
  @ViewChild(NtDatePickerCalendarComponent) calendar: NtDatePickerCalendarComponent<D>;

  /** Emits when the value changes (either due to user input or programmatic change). */
  private _valueChange = new EventEmitter<D | null>();
  private _onChange: (value: any) => void;
  private _onTouched: () => void;

  constructor(
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats,
    private _elementRef: ElementRef,
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    @Self() @Optional() public ngControl: NgControl) {
    super();
    this.origin = new OverlayOrigin(_elementRef);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit() {

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

  onFocus() {
    if (!this.overlay.isOpen && !this.disabled) {
      this.overlay.show();
    }
  }

  onShow() {
    this.calendar._init();
  }

  select(date: D) {
    this.value = date;
    this.overlay.hide();
    typeof this._onChange === 'function' && this._onChange(date);
  }

  clear() {
    this.value = null;
    typeof this._onChange === 'function' && this._onChange(this.value);
  }

  onClose() {
    typeof this._onTouched === 'function' && this._onTouched();
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
