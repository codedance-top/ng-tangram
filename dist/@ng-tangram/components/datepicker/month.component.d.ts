import { AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { DateAdapter, NtDateFormats } from '@ng-tangram/components/core';
import { NtDatePickerCell } from './datepicker-models';
export declare class NtDatePickerMonthComponent<D> implements AfterContentInit {
    private _changeDetectorRef;
    private _dateAdapter;
    private _dateFormats;
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
    _weekdays: {
        long: string;
        narrow: string;
    }[];
    private _activeDate;
    private _selected;
    private _minDate;
    private _maxDate;
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    activeDate: D;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new date is selected. */
    readonly selectedChange: EventEmitter<D | null>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateAdapter: DateAdapter<D>, _dateFormats: NtDateFormats);
    ngAfterContentInit(): void;
    /** Handles when a new date is selected. */
    _dateSelected(cell: NtDatePickerCell): void;
    _init(): void;
    /** Creates MatCalendarCells for the dates in this month. */
    private _createWeekCells();
    private _getWeekOffset();
    /** 在填满模式下 补充首行列 */
    private _fillBeforeCells();
    /** 在填满模式下 补充尾部列 */
    private _fillAfterCells();
    /** Date filter for the month */
    private _shouldEnableDate(date);
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    private _getDateInCurrentMonth(date);
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    private _hasSameMonthAndYear(d1, d2);
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj);
}
