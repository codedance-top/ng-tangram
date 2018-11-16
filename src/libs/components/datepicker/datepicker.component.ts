import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import {
  BOTTOM_LEFT, DateAdapter, NT_DATE_FORMATS, NtDateFormats, NtOverlayComponent, TOP_LEFT
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { NtDatePickerCalendarComponent } from './calendar.component';

@Component({
  selector: 'nt-datepicker',
  templateUrl: 'datepicker.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-datepicker nt-form-control',
    '[class.focus]': 'overlay.isOpen'
  },
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.15)),
      transition('void => *', fadeIn(.15))
    ])
  ],
  providers: [
    { provide: NtFormFieldControl, useExisting: NtDatePickerComponent }
  ]
})
export class NtDatePickerComponent<D> extends NtFormFieldControl<D> implements ControlValueAccessor {

  readonly origin: CdkOverlayOrigin;

  private _disabled = false;
  private _lastValueValid = false;
  private _readonly = false;
  private _required = false;

  private _value: D | null;
  private _startAt: D | null;
  private _minDate: D | null;
  private _maxDate: D | null;

  private _focused = false;

  _positionPairs: ConnectionPositionPair[] = [BOTTOM_LEFT, TOP_LEFT];

  get empty() { return !this.value; }
  get focused(): boolean { return this._focused; }

  get value(): D | null { return this._value; }
  set value(value: D | null) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = !value || this._dateAdapter.isValid(value);
    value = this._getValidDateOrNull(value);
    const oldDate = this.value;
    this._value = value;
    this.inputElement.nativeElement.value = value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
  }

  @Input() placeholder = '';

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
  get startAt(): D | null { return this._startAt || this.value; }
  set startAt(value: D | null) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input() dateFilter: (date: D) => boolean;

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild('inputElement') inputElement: ElementRef;

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;
  @ViewChild(NtDatePickerCalendarComponent) calendar: NtDatePickerCalendarComponent<D>;

  /** Emits when the value changes (either due to user input or programmatic change). */
  private _valueChange = new EventEmitter<D | null>();
  private _onChange: (value: any) => void = () => {};
  private _onTouched = () => {};

  constructor(
    _elementRef: ElementRef,
    private _dateAdapter: DateAdapter<D>,
    @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats,
    @Self() @Optional() public ngControl: NgControl) {
    super();
    this.origin = new CdkOverlayOrigin(_elementRef);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
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

  _onInputFocus() {
    if (!this.disabled) {
      this.overlay.show();
    }
  }

  _afterOpen(event: any) {
    this.afterOpen.next(event);
  }

  _afterClosed(event: any) {
    this.afterClosed.next(event);
  }

  _beforeOpen(event: any) {
    this._focused = true;
    this.calendar._init();
    this.beforeOpen.next(event);
  }

  _beforeClosed(event: any) {
    this._focused = false;
    typeof this._onTouched === 'function' && this._onTouched();
    this.inputElement.nativeElement.blur();
    this.beforeClosed.next(event);
  }

  _positionChange(change: ConnectedOverlayPositionChange) {
    this.positionChange.next(change);
  }

  focus() {
    if (!this.disabled) {
      this.inputElement.nativeElement.focus();
    }
  }

  select(date: D) {
    this.value = date;
    this.overlay.hide();
    this._onChange(date);
  }

  clear() {
    if (this.value !== null && !this.disabled) {
      this.value = null;
      this._onChange(this.value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
