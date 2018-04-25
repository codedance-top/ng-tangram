import { AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { DateAdapter, NtDateFormats } from '@ng-tangram/components/core';
import { NtDatePickerCell } from './datepicker-models';
export declare class NtDatePickerYearComponent<D> implements AfterContentInit {
    private _changeDetectorRef;
    private _dateAdapter;
    private _dateFormats;
    /** Grid of calendar cells representing the months of the year. */
    _months: NtDatePickerCell[][];
    /** The month in this year that today falls on. Null if today is in a different year. */
    _todayMonth: number | null;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    _selectedMonth: number | null;
    private _activeDate;
    private _selected;
    private _minDate;
    private _maxDate;
    activeDate: D;
    readonly activeYear: number | null;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new month is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected month. This doesn't imply a change on the selected date */
    readonly monthSelected: EventEmitter<D>;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateAdapter: DateAdapter<D>, _dateFormats: NtDateFormats);
    ngAfterContentInit(): void;
    _init(): void;
    /** Handles when a new month is selected. */
    _monthSelected(month: number): void;
    /** Creates an MatCalendarCell for the given month. */
    private _createCellForMonth(month, monthName);
    /** Whether the given month is enabled. */
    private _shouldEnableMonth(month);
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    private _isYearAndMonthAfterMaxDate(year, month);
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    private _isYearAndMonthBeforeMinDate(year, month);
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getMonthInCurrentYear(date);
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj);
}
