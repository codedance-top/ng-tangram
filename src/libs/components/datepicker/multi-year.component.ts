import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter } from '@ng-tangram/components/core';

import {
  NtCalendarBody,
  NtCalendarCell,
  NtCalendarCellClassFunction,
  NtCalendarUserEvent
} from './calendar-body.component';
import { getActiveOffset, isSameMultiYearView, yearsPerPage, yearsPerRow } from './calendar-utils';
import { DateRange } from './selections';
import { createMissingDateImplError } from './datepicker-errors';

@Component({
  selector: 'nt-calendar-multi-year',
  templateUrl: 'multi-year.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-calendar-multi-year'
  }
})
export class NtCalendarMultiYear<D> implements AfterContentInit, OnDestroy {

  private _rerenderSubscription = Subscription.EMPTY;

  private _activeDate: D;

  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    let oldActiveDate = this._activeDate;
    const validDate =
      this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value)
      ) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);

    if (!isSameMultiYearView(
      this._dateAdapter, oldActiveDate, this._activeDate, this.minDate, this.maxDate)) {
      this._init();
    }
  }

  /** The currently selected date. */
  private _selected: D | null;

  @Input()
  get selected(): D | null { return this._selected; }
  set selected(value: D | null) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }

    this._setSelectedYear(value);
  }

  /** The minimum selectable date. */
  private _minDate: D | null;

  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** The maximum selectable date. */
  private _maxDate: D | null;

  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Function that can be used to add custom CSS classes to date cells. */
  @Input() dateClass: NtCalendarCellClassFunction<D>;

  /** Emits when a new year is selected. */
  @Output() readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

  /** Emits the selected year. This doesn't imply a change on the selected date */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /** Emits when any date is activated. */
  @Output() readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

  @ViewChild(NtCalendarBody) _calendarBody: NtCalendarBody;

  /** Grid of calendar cells representing the currently displayed years. */
  _years: NtCalendarCell[][];

  /** The year that today falls on. */
  _todayYear: number;

  /** The year of the selected date. Null if the selected date is null. */
  _selectedYear: number | null;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() public _dateAdapter: DateAdapter<D>) {
    if (!this._dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
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
  /** Handles when a new year is selected. */
  _yearSelected(event: NtCalendarUserEvent<number>) {
    const year = event.value;
    this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
    let month = this._dateAdapter.getMonth(this.activeDate);
    let daysInMonth =
        this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
    this.selectedChange.emit(this._dateAdapter.createDate(year, month,
        Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
  }

  _getActiveCell(): number {
    return getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate);
  }

  /** Focuses the active cell after the microtask queue is empty. */
  _focusActiveCell() {
    this._calendarBody._focusActiveCell();
  }

  /** Creates an MatCalendarCell for the given year. */
  private _createCellForYear(year: number) {
    const date = this._dateAdapter.createDate(year, 0, 1);
    const yearName = this._dateAdapter.getYearName(date);
    const cellClasses = this.dateClass ? this.dateClass(date, 'multi-year') : undefined;

    return new NtCalendarCell(year, yearName, this._shouldEnableYear(year), cellClasses);
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

  /** Sets the currently-highlighted year based on a model value. */
  private _setSelectedYear(value: DateRange<D> | D | null) {
    this._selectedYear = null;

    if (value instanceof DateRange) {
      const displayValue = value.start || value.end;

      if (displayValue) {
        this._selectedYear = this._dateAdapter.getYear(displayValue);
      }
    } else if (value) {
      this._selectedYear = this._dateAdapter.getYear(value);
    }
  }
}
