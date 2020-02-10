import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NtDateFormats } from '@ng-tangram/components/core';

import { createMissingDateImplError } from './datepicker-errors';
import { NtDatePickerMonthComponent } from './month.component';
import { NtDatePickerMultiYearComponent, yearsPerPage } from './multi-year.component';
import { NtDatePickerYearComponent } from './year.component';

export type NtDatePickerViewType = 'month' | 'year' | 'multi-year';

@Component({
  selector: 'nt-datepicker-calendar',
  templateUrl: 'calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NtDatePickerCalendarComponent<D> implements AfterContentInit, OnChanges, OnDestroy {

  _viewType: NtDatePickerViewType = 'month';
  _currentView: NtDatePickerViewType = 'month';

  private _startAt: D | null;

  @Input()
  get startAt(): D | null { return this._startAt; }
  set startAt(value: D | null) {
    this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** The currently selected date. */
  private _selected: D | null;

  @Input()
  get selected(): D | null { return this._selected; }
  set selected(value: D | null) {
    this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** The minimum selectable date. */
  private _minDate: D | null;

  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** The maximum selectable date. */
  private _maxDate: D | null;

  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Emits when the currently selected date changes. */
  @Output() readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits the year chosen in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits the month chosen in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

  /** Reference to the current month view component. */
  @ViewChild(NtDatePickerMonthComponent) monthView: NtDatePickerMonthComponent<D>;

  /** Reference to the current year view component. */
  @ViewChild(NtDatePickerYearComponent) yearView: NtDatePickerYearComponent<D>;

  /** Reference to the current multi-year view component. */
  @ViewChild(NtDatePickerMultiYearComponent) multiYearView: NtDatePickerMultiYearComponent<D>;

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  private _clampedActiveDate: D;

  get _activeDate(): D { return this._clampedActiveDate; }
  set _activeDate(value: D) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
  }

  get _monthLabel() {
    return this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthLabel).toLocaleUpperCase();
  }

  get _yearLabel() { return this._dateAdapter.getYearName(this._activeDate); }

  get _multiYearLabel() {
    const activeYear = this._dateAdapter.getYear(this._activeDate);
    const firstYearInView = this._dateAdapter.getYearName(
      this._dateAdapter.createDate(activeYear - activeYear % yearsPerPage, 0, 1), 'en-US');
    const lastYearInView = this._dateAdapter.getYearName(
      this._dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % yearsPerPage, 0, 1), 'en-US');
    return `${firstYearInView} \u2013 ${lastYearInView}`;
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats) {

    if (!this._dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }

    if (!this._dateFormats) {
      throw createMissingDateImplError('NT_DATE_FORMATS');
    }
  }

  ngAfterContentInit() {
    this._init();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.minDate || changes.maxDate || changes.dateFilter;
    if (change && !change.firstChange) {
      const view = this.monthView || this.yearView || this.multiYearView;
      if (view) {
        view._init();
      }
    }
  }

  ngOnDestroy() {
    // throw new Error("Method not implemented.");
  }

  prevMonth() {
    this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -1);
  }

  nextMonth() {
    this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
  }

  prevYear() {
    this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -1);
  }

  nextYear() {
    this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, 1);
  }

  prevYearArray() {
    this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerPage);
  }

  nextYearArray() {
    this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerPage);
  }

  _init() {
    this._activeDate = this.startAt || this._dateAdapter.today();
    this._currentView = this._viewType;
    this._changeDetectorRef.markForCheck();
  }

  /** Handles date selection in the month view. */
  _dateSelected(date: D) {
    if (!this._dateAdapter.sameDate(date, this.selected)) {
      this.selectedChange.emit(date);
    }
  }

  /** Handles year selection in the multiyear view. */
  _yearSelectedInMultiYearView(normalizedYear: D) {
    this.yearSelected.emit(normalizedYear);
  }

  /** Handles month selection in the year view. */
  _monthSelectedInYearView(normalizedMonth: D) {
    this.monthSelected.emit(normalizedMonth);
  }

  /** Handles year/month selection in the multi-year/year views. */
  _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void {
    this._activeDate = date;
    this._currentView = view;
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
