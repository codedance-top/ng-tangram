import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject,
  Input, Optional, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NtDateFormats } from '@ng-tangram/components/core';

import { Subscription } from 'rxjs/Subscription';

import { createMissingDateImplError } from './datepicker-errors';
import { NtDatePickerCell } from './datepicker-models';

const DAYS_PER_WEEK = 7;

const DAYS_MAX_ROWS = 6;

@Component({
  selector: 'nt-datepicker-month',
  templateUrl: 'month.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-datepicker-month'
  }
})
export class NtDatePickerMonthComponent<D> implements AfterContentInit {

  /** The label for this month (e.g. "January 2017"). */
  _monthLabel: string;

  /** Grid of calendar cells representing the dates of the month. */
  _weeks: NtDatePickerCell[][];

  /** The number of blank cells in the first row before the 1st of the month. */
  _firstWeekOffset: number;

  /**
   * The date of the month that the currently selected Date falls on.
   * Null if the currently selected Date is in another month.
   */
  _selectedDate: number | null;

  /** The date of the month that today falls on. Null if today is in another month. */
  _todayDate: number | null;

  /** The names of the weekdays. */
  _weekdays: { long: string, narrow: string }[];

  private _activeDate: D;
  private _selected: D | null;
  private _minDate: D | null;
  private _maxDate: D | null;

  /**
   * The date to display in this month view (everything other than the month and year is ignored).
   */
  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    const oldActiveDate = this._activeDate;
    const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }

  /** The currently selected date. */
  @Input()
  get selected(): D | null { return this._selected; }
  set selected(value: D | null) {
    this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._selectedDate = this._getDateInCurrentMonth(this._selected);
  }

  /** The minimum selectable date. */
  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** The maximum selectable date. */
  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Emits when a new date is selected. */
  @Output() readonly selectedChange: EventEmitter<D | null> = new EventEmitter<D | null>();

  /** Emits when any date is activated. */
  @Output() readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

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

    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    // Rotate the labels for days of the week based on the configured first day of the week.
    let weekdays = longWeekdays.map((long, i) => {
      return { long, narrow: narrowWeekdays[i] };
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    this._activeDate = this._dateAdapter.today();
  }

  ngAfterContentInit(): void {
    this._init();
  }

  /** Handles when a new date is selected. */
  _dateSelected(cell: NtDatePickerCell) {
    if (cell.enabled && this._selectedDate !== cell.value) {
      const selectedYear = this._dateAdapter.getYear(this.activeDate);
      const selectedMonth = this._dateAdapter.getMonth(this.activeDate);
      const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, cell.value);
      this.selectedChange.emit(selectedDate);
    }
  }

  _init() {

    this._selectedDate = this._getDateInCurrentMonth(this.selected);

    this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
    this._monthLabel = this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
      .toLocaleUpperCase();

    const firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),
      this._dateAdapter.getMonth(this.activeDate), 1);

    this._firstWeekOffset = (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
      this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

    this._createWeekCells();
    this._changeDetectorRef.markForCheck();
  }

  /** Creates MatCalendarCells for the dates in this month. */
  private _createWeekCells() {
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
    const dateNames = this._dateAdapter.getDateNames();

    this._weeks = [[]];

    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++ , cell++) {
      if (cell === DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
      const enabled = this._shouldEnableDate(date);
      this._weeks[this._weeks.length - 1].push(new NtDatePickerCell(i + 1, dateNames[i], enabled));
    }

    this._fillBeforeCells();
    this._fillAfterCells();
  }

  private _getWeekOffset() {
    const firstDayForCurrentMonth = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this.activeDate),
      this._dateAdapter.getMonth(this.activeDate), 1);

    const firstDayForWeek = this._dateAdapter.getDayOfWeek(firstDayForCurrentMonth);

    return firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() >= 0
      ? firstDayForWeek - this._dateAdapter.getFirstDayOfWeek()
      : firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() + DAYS_PER_WEEK;
  }

  /** 在填满模式下 补充首行列 */
  private _fillBeforeCells(): void {

    const beforeMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), -1);
    const daysInBeforeMonth = this._dateAdapter.getNumDaysInMonth(beforeMonth);
    const dateNames = this._dateAdapter.getDateNames();
    const beforeWeeks: NtDatePickerCell[] = [];

    for (let i = daysInBeforeMonth - this._firstWeekOffset; i < daysInBeforeMonth; i++) {
      beforeWeeks.push(new NtDatePickerCell(i + 1, dateNames[i], false));
    }

    this._weeks[0] = beforeWeeks.concat(this._weeks[0]);
  }

  /** 在填满模式下 补充尾部列 */
  private _fillAfterCells(): void {

    const afterMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), 1);
    const lastRow = this._weeks[this._weeks.length - 1];
    const dateNames = this._dateAdapter.getDateNames();
    const afterWeeks: NtDatePickerCell[] = [], afterRows: NtDatePickerCell[] = [];

    for (let i = 0; i < DAYS_PER_WEEK - lastRow.length; i++) {
      afterWeeks.push(new NtDatePickerCell(i + 1, dateNames[i], false));
    }

    lastRow.push(...afterWeeks);

    for (let i = 0; i < DAYS_PER_WEEK * (DAYS_MAX_ROWS - this._weeks.length); i++) {
      afterRows.push(new NtDatePickerCell(afterWeeks.length + i + 1, dateNames[afterWeeks.length + i], false));
    }

    this._weeks.push(...afterRows.map(_ => afterRows.splice(0, DAYS_PER_WEEK)).filter(row => !!row));
  }


  /** Date filter for the month */
  private _shouldEnableDate(date: D): boolean {
    return !!date &&
      (!this.dateFilter || this.dateFilter(date)) &&
      (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
      (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0);
  }

  /**
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */
  private _getDateInCurrentMonth(date: D | null): number | null {
    return date && this._hasSameMonthAndYear(date, this.activeDate) ?
      this._dateAdapter.getDate(date) : null;
  }

  /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
  private _hasSameMonthAndYear(d1: D | null, d2: D | null): boolean {
    return !!(d1 && d2 && this._dateAdapter.getMonth(d1) === this._dateAdapter.getMonth(d2) &&
      this._dateAdapter.getYear(d1) === this._dateAdapter.getYear(d2));
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
