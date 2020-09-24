import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import {
  Attribute,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  DateAdapter,
  fadeIn,
  fadeOut,
  NT_DATE_FORMATS,
  NtDateFormats
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { BOTTOM_LEFT, NtOverlayComponent, TOP_LEFT } from '@ng-tangram/components/overlay';

import { NtDatePickerCalendarComponent } from './calendar.component';
import {
  DEFAULT_DATEPICKER_ICONS,
  NT_DATEPICKER_ICONS,
  NtDatePickerIcons
} from './datepicker-icons';

@Component({
  selector: 'nt-datepicker',
  templateUrl: 'datepicker.component.html',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-datepicker',
    // '[class.disabled]': 'disabled',
    // '[class.readonly]': 'readonly',
    '(click)': '_onClick($event)',
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

  private _overlayToggle = new Subject<boolean>();

  tabIndex: number;

  _positionPairs: ConnectionPositionPair[] = [BOTTOM_LEFT, TOP_LEFT];

  _displayValue: string = '';

  get empty() { return !this.value; }

  private _value: D | null;

  get value(): D | null { return this._value; }
  set value(value: D | null) {
    value = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._value = value;
    this._displayValue = value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
  }

  private _placeholder = '';

  @Input()
  set placeholder(value: string) { this._placeholder = value; }
  get placeholder() { return this._placeholder; }

  private _disabled = false;

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  private _required = false;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  private _readonly = false;

  @Input()
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  get readonly() { return this._readonly; }

  private _startAt: D | null;

  @Input()
  get startAt(): D | null { return this._startAt || this.value; }
  set startAt(value: D | null) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  private _minDate: D | null;

  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  private _maxDate: D | null;

  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }

  @Input() dateFilter: (date: D) => boolean;

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent, { static: true }) overlay: NtOverlayComponent;
  @ViewChild(NtDatePickerCalendarComponent, { static: true }) calendar: NtDatePickerCalendarComponent<D>;

  private _onChange: (value: any) => void = () => { };

  private _onTouched = () => { };

  readonly origin: CdkOverlayOrigin;

  constructor(
    private _elementRef: ElementRef,
    private _dateAdapter: DateAdapter<D>,
    @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats,
    @Attribute('tabindex') tabIndex: string,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Inject(NT_DATEPICKER_ICONS) public icons: NtDatePickerIcons) {
    super();
    this.origin = new CdkOverlayOrigin(_elementRef);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.icons = { ...DEFAULT_DATEPICKER_ICONS, ...icons };

    this.tabIndex = parseInt(tabIndex) || 0;

    this._overlayToggle.pipe(debounceTime(10)).subscribe(open => open
      ? this.overlay.open()
      : this.overlay.toggle()
    );
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

  select(date: D) {
    this.value = date;
    this.overlay.close();
    this._onChange(date);
  }

  focus() {
    this.overlay.open();
  }

  _onAfterOpen(event: any) {
    this.afterOpen.next(event);
  }

  _onAfterClosed(event: any) {
    this.afterClosed.next(event);
  }

  _onBeforeOpen(event: any) {
    this.calendar._init();
    this.beforeOpen.next(event);
  }

  _onBeforeClosed(event: any) {
    typeof this._onTouched === 'function' && this._onTouched();
    this.beforeClosed.next(event);
  }

  _onPositionChange(change: ConnectedOverlayPositionChange) {
    this.positionChange.next(change);
  }

  _onClick(event: Event) {
    if (!this.disabled) {
      this.overlay.toggle();
    }
    event.stopPropagation();
  }

  _onClear(event: Event) {
    if (this.value !== null && !this.disabled) {
      this.value = null;
      this._onChange(this.value);
    }
    event.stopPropagation();
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
