import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NtDateFormats } from '@ng-tangram/components/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NtCalendarBody, NtCalendarCell, NtCalendarCellClassFunction, NtCalendarUserEvent } from './calendar-body.component';
import { DateRange } from './selections';

import { createMissingDateImplError } from './datepicker-errors';

@Component({
  selector: 'nt-calendar-year',
  templateUrl: 'year.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-calendar-year'
  }
})
export class NtCalendarYear<D> implements AfterContentInit, OnDestroy {

  private _rerenderSubscription = Subscription.EMPTY;

  private _activeDate: D;

  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    let oldActiveDate = this._activeDate;
    const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);

    if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
      this._init();
    }
  }

  private _selected: D | null;

  /** The currently selected date. */
  @Input()
  get selected(): D | null { return this._selected; }
  set selected(value: D | null) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
  }

  private _minDate: D | null;

  /** The minimum selectable date. */
  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  private _maxDate: D | null;

  /** The maximum selectable date. */
  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Function that can be used to add custom CSS classes to date cells. */
  @Input() dateClass: NtCalendarCellClassFunction<D>;

  /** Emits when a new month is selected. */
  @Output() readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

  /** Emits the selected month. This doesn't imply a change on the selected date */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

  /** Emits when any date is activated. */
  @Output() readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

  @ViewChild(NtCalendarBody) _calendarBody: NtCalendarBody;

  /** Grid of calendar cells representing the months of the year. */
  _months: NtCalendarCell[][];

  /** The label for this year (e.g. "2017"). */
  _yearLabel: string;

  /** The month in this year that today falls on. Null if today is in a different year. */
  _todayMonth: number | null;

  /**
   * The month in this year that the selected Date falls on.
   * Null if the selected Date is in a different year.
   */
  _selectedMonth: number | null;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() public _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats) {

    if (!this._dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }

    if (!this._dateFormats) {
      throw createMissingDateImplError('NT_DATE_FORMATS');
    }

    this._activeDate = this._dateAdapter.today();
  }

  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges
      .pipe(startWith(null))
      .subscribe(() => this._init());
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }

  _init() {
    this._setSelectedMonth(this.selected);
    // this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
    this._yearLabel = this._dateAdapter.getYearName(this.activeDate);

    const monthNames = this._dateAdapter.getMonthNames('short');

    this._months = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map(row => row.map(
      month => this._createCellForMonth(month, monthNames[month])));

    this._changeDetectorRef.markForCheck();
  }

  /** Handles when a new month is selected. */
  _monthSelected(event: NtCalendarUserEvent<number>) {
    const month = event.value;
    const normalizedDate =
          this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);

    this.monthSelected.emit(normalizedDate);

    const daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);

    this.selectedChange.emit(this._dateAdapter.createDate(
        this._dateAdapter.getYear(this.activeDate), month,
        Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
  }

    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell() {
      this._calendarBody._focusActiveCell();
    }


/**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */
  private _getMonthInCurrentYear(date: D | null) {
    return date && this._dateAdapter.getYear(date) == this._dateAdapter.getYear(this.activeDate) ?
        this._dateAdapter.getMonth(date) : null;
  }

  /** Creates an MatCalendarCell for the given month. */
  private _createCellForMonth(month: number, monthName: string) {
    const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
    const cellClasses = this.dateClass ? this.dateClass(date, 'year') : undefined;

    return new NtCalendarCell(
        month,
        monthName.toLocaleUpperCase(),
        this._shouldEnableMonth(month),
        cellClasses
      );
  }

  /** Whether the given month is enabled. */
  private _shouldEnableMonth(month: number) {

    const activeYear = this._dateAdapter.getYear(this.activeDate);

    if (month === undefined || month === null ||
        this._isYearAndMonthAfterMaxDate(activeYear, month) ||
        this._isYearAndMonthBeforeMinDate(activeYear, month)) {
      return false;
    }

    if (!this.dateFilter) {
      return true;
    }

    const firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);

    // If any date in the month is enabled count the month as enabled.
    for (let date = firstOfMonth; this._dateAdapter.getMonth(date) == month;
         date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Tests whether the combination month/year is after this.maxDate, considering
   * just the month and year of this.maxDate
   */
  private _isYearAndMonthAfterMaxDate(year: number, month: number) {
    if (this.maxDate) {
      const maxYear = this._dateAdapter.getYear(this.maxDate);
      const maxMonth = this._dateAdapter.getMonth(this.maxDate);

      return year > maxYear || (year === maxYear && month > maxMonth);
    }

    return false;
  }

  /**
   * Tests whether the combination month/year is before this.minDate, considering
   * just the month and year of this.minDate
   */
  private _isYearAndMonthBeforeMinDate(year: number, month: number) {
    if (this.minDate) {
      const minYear = this._dateAdapter.getYear(this.minDate);
      const minMonth = this._dateAdapter.getMonth(this.minDate);

      return year < minYear || (year === minYear && month < minMonth);
    }

    return false;
  }


  /** Sets the currently-selected month based on a model value. */
  private _setSelectedMonth(value: DateRange<D> | D | null) {
    if (value instanceof DateRange) {
      this._selectedMonth = this._getMonthInCurrentYear(value.start) ||
                            this._getMonthInCurrentYear(value.end);
    } else {
      this._selectedMonth = this._getMonthInCurrentYear(value);
    }
  }
}
