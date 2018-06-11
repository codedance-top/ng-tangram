import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter } from '@ng-tangram/components/core';

import { createMissingDateImplError } from './datepicker-errors';
import { NtDatePickerCell } from './datepicker-models';

export const yearsPerPage = 12;

export const yearsPerRow = 3;

@Component({
  selector: 'nt-datepicker-multi-year',
  templateUrl: 'multi-year.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-datepicker-multi-year'
  }
})
export class NtDatePickerMultiYearComponent<D>  {

  /** Grid of calendar cells representing the currently displayed years. */
  _years: NtDatePickerCell[][];

  /** The year that today falls on. */
  _todayYear: number;

  /** The year of the selected date. Null if the selected date is null. */
  _selectedYear: number | null;

  private _activeDate: D;
  private _selected: D | null;
  private _minDate: D | null;
  private _maxDate: D | null;

  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    let oldActiveDate = this._activeDate;
    const validDate =
        this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (Math.floor(this._dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
        Math.floor(this._dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
      this._init();
    }
  }

  /** The currently selected date. */
  @Input()
  get selected(): D | null { return this._selected; }
  set selected(value: D | null) {
    this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
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

  /** Emits when a new year is selected. */
  @Output() readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

  /** Emits the selected year. This doesn't imply a change on the selected date */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() public _dateAdapter: DateAdapter<D>) {
    if (!this._dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }

    this._activeDate = this._dateAdapter.today();
  }

  ngAfterContentInit() {
    this._init();
  }

  _init() {
    this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
    let activeYear = this._dateAdapter.getYear(this._activeDate);
    let activeOffset = activeYear % yearsPerPage;
    this._years = [];
    for (let i = 0, row: number[] = []; i < yearsPerPage; i++) {
      row.push(activeYear - activeOffset + i);
      if (row.length === yearsPerRow) {
        this._years.push(row.map(year => this._createCellForYear(year)));
        row = [];
      }
    }
    this._changeDetectorRef.markForCheck();
  }

  /** Handles when a new year is selected. */
  _yearSelected(year: number) {
    this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
    let month = this._dateAdapter.getMonth(this.activeDate);
    let daysInMonth =
      this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
    this.selectedChange.emit(this._dateAdapter.createDate(year, month,
      Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
  }

  /** Creates an MatCalendarCell for the given year. */
  private _createCellForYear(year: number) {
    let yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));
    return new NtDatePickerCell(year, yearName, this._shouldEnableYear(year));
  }

  /** Whether the given year is enabled. */
  private _shouldEnableYear(year: number) {
    // disable if the year is greater than maxDate lower than minDate
    if (year === undefined || year === null ||
      (this.maxDate && year > this._dateAdapter.getYear(this.maxDate)) ||
      (this.minDate && year < this._dateAdapter.getYear(this.minDate))) {
      return false;
    }

    // enable if it reaches here and there's no filter defined
    if (!this.dateFilter) {
      return true;
    }

    const firstOfYear = this._dateAdapter.createDate(year, 0, 1);

    // If any date in the year is enabled count the year as enabled.
    for (let date = firstOfYear; this._dateAdapter.getYear(date) === year;
      date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
  }
}
