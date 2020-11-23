import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

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

import {
  NtCalendarBody,
  NtCalendarCell,
  NtCalendarCellClassFunction,
  NtCalendarUserEvent
} from './calendar-body.component';
import { createMissingDateImplError } from './datepicker-errors';
import {
  DateRange,
  NT_DATE_RANGE_SELECTION_STRATEGY,
  NtDateRangeSelectionStrategy
} from './selections';

const DAYS_PER_WEEK = 7;

const DAYS_MAX_ROWS = 6;

@Component({
  selector: 'nt-calendar-month',
  templateUrl: 'month.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-calendar-month'
  }
})
export class NtCalendarMonth<D> implements AfterContentInit, OnChanges, OnDestroy {

  private _rerenderSubscription = Subscription.EMPTY;

  private _activeDate: D;

  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    const oldActiveDate = this._activeDate;
    const validDate =
      this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value)
      ) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }

  private _selected: DateRange<D> | D | null;

  @Input()
  get selected(): DateRange<D> | D | null { return this._selected; }
  set selected(value: DateRange<D> | D | null) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }

    this._setRanges(this._selected);
  }

  private _minDate: D | null;

  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  private _maxDate: D | null;

  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  /** Function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: NtCalendarCellClassFunction<D>;

  /** Start of the comparison range. */
  @Input() comparisonStart: D | null;

  /** End of the comparison range. */
  @Input() comparisonEnd: D | null;

  /** Emits when a new date is selected. */
  @Output() readonly selectedChange: EventEmitter<D | null> = new EventEmitter<D | null>();

  /** Emits when any date is selected. */
  @Output() readonly _userSelection: EventEmitter<NtCalendarUserEvent<D | null>> =
      new EventEmitter<NtCalendarUserEvent<D | null>>();

  /** Emits when any date is activated. */
  @Output() readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

  @ViewChild(NtCalendarBody) _calendarBody: NtCalendarBody;

  /** The label for this month (e.g. "January 2017"). */
  _monthLabel: string;

  /** Grid of calendar cells representing the dates of the month. */
  _weeks: NtCalendarCell[][];

  /** The number of blank cells in the first row before the 1st of the month. */
  _firstWeekOffset: number;

  /** Start value of the currently-shown date range. */
  _rangeStart: number | null;

  /** End value of the currently-shown date range. */
  _rangeEnd: number | null;

  /** Start value of the currently-shown comparison date range. */
  _comparisonRangeStart: number | null;

  /** End value of the currently-shown comparison date range. */
  _comparisonRangeEnd: number | null;

  /** Start of the preview range. */
  _previewStart: number | null;

  /** End of the preview range. */
  _previewEnd: number | null;

  /** Whether the user is currently selecting a range of dates. */
  _isRange: boolean;

  /** The date of the month that today falls on. Null if today is in another month. */
  _todayDate: number | null;

  /** The names of the weekdays. */
  _weekdays: {long: string, narrow: string}[];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() public _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(NT_DATE_FORMATS) private _dateFormats: NtDateFormats,
    @Inject(NT_DATE_RANGE_SELECTION_STRATEGY) @Optional()
            private _rangeStrategy?: NtDateRangeSelectionStrategy<D>) {

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


  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges
      .pipe(startWith(null))
      .subscribe(() => this._init());
  }

  ngOnChanges(changes: SimpleChanges) {
    const comparisonChange = changes['comparisonStart'] || changes['comparisonEnd'];

    if (comparisonChange && !comparisonChange.firstChange) {
      this._setRanges(this.selected);
    }
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }

  /** Handles when a new date is selected. */
  _dateSelected(event: NtCalendarUserEvent<number>) {
    const date = event.value;
    const selectedYear = this._dateAdapter.getYear(this.activeDate);
    const selectedMonth = this._dateAdapter.getMonth(this.activeDate);
    const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date);
    let rangeStartDate: number | null;
    let rangeEndDate: number | null;

    if (this._selected instanceof DateRange) {
      rangeStartDate = this._getDateInCurrentMonth(this._selected.start);
      rangeEndDate = this._getDateInCurrentMonth(this._selected.end);
    } else {
      rangeStartDate = rangeEndDate = this._getDateInCurrentMonth(this._selected);
    }

    if (rangeStartDate !== date || rangeEndDate !== date) {
      this.selectedChange.emit(selectedDate);
    }

    this._userSelection.emit({value: selectedDate, event: event.event});
  }

  /** Initializes this month view. */
  _init() {
    this._setRanges(this.selected);
    this._todayDate = this._getCellCompareValue(this._dateAdapter.today());
    this._monthLabel =
        this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
            .toLocaleUpperCase();

    let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),
        this._dateAdapter.getMonth(this.activeDate), 1);
    this._firstWeekOffset =
        (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
          this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

    this._initWeekdays();
    this._createWeekCells();
    this._changeDetectorRef.markForCheck();
  }

  /** Focuses the active cell after the microtask queue is empty. */
  _focusActiveCell(movePreview?: boolean) {
    this._calendarBody._focusActiveCell(movePreview);
  }

  /** Called when the user has activated a new cell and the preview needs to be updated. */
  _previewChanged({event, value: cell}: NtCalendarUserEvent<NtCalendarCell<D> | null>) {
    if (this._rangeStrategy) {
      // We can assume that this will be a range, because preview
      // events aren't fired for single date selections.
      const value = cell ? cell.rawValue! : null;
      const previewRange =
          this._rangeStrategy.createPreview(value, this.selected as DateRange<D>, event);
      this._previewStart = this._getCellCompareValue(previewRange.start);
      this._previewEnd = this._getCellCompareValue(previewRange.end);

      // Note that here we need to use `detectChanges`, rather than `markForCheck`, because
      // the way `_focusActiveCell` is set up at the moment makes it fire at the wrong time
      // when navigating one month back using the keyboard which will cause this handler
      // to throw a "changed after checked" error when updating the preview state.
      this._changeDetectorRef.detectChanges();
    }
  }

  /** Initializes the weekdays. */
  private _initWeekdays() {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    // Rotate the labels for days of the week based on the configured first day of the week.
    let weekdays = longWeekdays.map((long, i) => {
        return {long, narrow: narrowWeekdays[i]};
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }

  /** Creates MatCalendarCells for the dates in this month. */
  private _createWeekCells() {
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
    const dateNames = this._dateAdapter.getDateNames();
    this._weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
            this._dateAdapter.getYear(this.activeDate),
            this._dateAdapter.getMonth(this.activeDate), i + 1);
      const enabled = this._shouldEnableDate(date);
      // const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
      const cellClasses = this.dateClass ? this.dateClass(date, 'month') : undefined;

      this._weeks[this._weeks.length - 1].push(new NtCalendarCell<D>(i + 1, dateNames[i],
           enabled, cellClasses, this._getCellCompareValue(date)!, date));
    }

    this._fillBeforeCells();
    this._fillAfterCells();
  }

  // private _getWeekOffset() {
  //   const firstDayForCurrentMonth = this._dateAdapter.createDate(
  //     this._dateAdapter.getYear(this.activeDate),
  //     this._dateAdapter.getMonth(this.activeDate), 1);

  //   const firstDayForWeek = this._dateAdapter.getDayOfWeek(firstDayForCurrentMonth);

  //   return firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() >= 0
  //     ? firstDayForWeek - this._dateAdapter.getFirstDayOfWeek()
  //     : firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() + DAYS_PER_WEEK;
  // }

  /** 在填满模式下 补充首行列 */
  private _fillBeforeCells(): void {

    const beforeMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), -1);
    const daysInBeforeMonth = this._dateAdapter.getNumDaysInMonth(beforeMonth);
    const dateNames = this._dateAdapter.getDateNames();
    const beforeWeeks: NtCalendarCell[] = [];

    for (let i = daysInBeforeMonth - this._firstWeekOffset; i < daysInBeforeMonth; i++) {
      beforeWeeks.push(new NtCalendarCell(i + 1, dateNames[i], false));
    }

    this._weeks[0] = beforeWeeks.concat(this._weeks[0]);
  }

  /** 在填满模式下 补充尾部列 */
  private _fillAfterCells(): void {

    const afterMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), 1);
    const lastRow = this._weeks[this._weeks.length - 1];
    const dateNames = this._dateAdapter.getDateNames();
    const afterWeeks: NtCalendarCell[] = [], afterRows: NtCalendarCell[] = [];

    for (let i = 0; i < DAYS_PER_WEEK - lastRow.length; i++) {
      afterWeeks.push(new NtCalendarCell(i + 1, dateNames[i], false));
    }

    lastRow.push(...afterWeeks);

    for (let i = 0; i < DAYS_PER_WEEK * (DAYS_MAX_ROWS - this._weeks.length); i++) {
      afterRows.push(new NtCalendarCell(afterWeeks.length + i + 1, dateNames[afterWeeks.length + i], false));
    }

    this._weeks.push(...afterRows.map(_ => afterRows.splice(0, DAYS_PER_WEEK)).filter(row => !!row));
  }


  /** Date filter for the month */
  private _shouldEnableDate(date: D): boolean {
    return !!date &&
        (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
        (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0) &&
        (!this.dateFilter || this.dateFilter(date));
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
    return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) &&
              this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
  }

  /** Gets the value that will be used to one cell to another. */
  private _getCellCompareValue(date: D | null): number | null {
    if (date) {
      // We use the time since the Unix epoch to compare dates in this view, rather than the
      // cell values, because we need to support ranges that span across multiple months/years.
      const year = this._dateAdapter.getYear(date);
      const month = this._dateAdapter.getMonth(date);
      const day = this._dateAdapter.getDate(date);
      return new Date(year, month, day).getTime();
    }

    return null;
  }

  /** Sets the current range based on a model value. */
  private _setRanges(selectedValue: DateRange<D> | D | null) {
    if (selectedValue instanceof DateRange) {
      this._rangeStart = this._getCellCompareValue(selectedValue.start);
      this._rangeEnd = this._getCellCompareValue(selectedValue.end);
      this._isRange = true;
    } else {
      this._rangeStart = this._rangeEnd = this._getCellCompareValue(selectedValue);
      this._isRange = false;
    }

    this._comparisonRangeStart = this._getCellCompareValue(this.comparisonStart);
    this._comparisonRangeEnd = this._getCellCompareValue(this.comparisonEnd);
  }
}
