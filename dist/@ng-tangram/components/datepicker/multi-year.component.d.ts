import { DateAdapter } from '@ng-tangram/components/core';
import { NtDatePickerCell } from './datepicker-models';
import { EventEmitter, ChangeDetectorRef } from '@angular/core';
export declare const yearsPerPage = 12;
export declare const yearsPerRow = 3;
export declare class NtDatePickerMultiYearComponent<D> {
    private _changeDetectorRef;
    _dateAdapter: DateAdapter<D>;
    /** Grid of calendar cells representing the currently displayed years. */
    _years: NtDatePickerCell[][];
    /** The year that today falls on. */
    _todayYear: number;
    /** The year of the selected date. Null if the selected date is null. */
    _selectedYear: number | null;
    private _activeDate;
    private _selected;
    private _minDate;
    private _maxDate;
    activeDate: D;
    /** The currently selected date. */
    selected: D | null;
    /** The minimum selectable date. */
    minDate: D | null;
    /** The maximum selectable date. */
    maxDate: D | null;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new year is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected year. This doesn't imply a change on the selected date */
    readonly yearSelected: EventEmitter<D>;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateAdapter: DateAdapter<D>);
    ngAfterContentInit(): void;
    _init(): void;
    /** Handles when a new year is selected. */
    _yearSelected(year: number): void;
    /** Creates an MatCalendarCell for the given year. */
    private _createCellForYear(year);
    /** Whether the given year is enabled. */
    private _shouldEnableYear(year);
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj);
}
