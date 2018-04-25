import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DateAdapter, NtDateFormats } from '@ng-tangram/components/core';
import { NtDatePickerMonthComponent } from './month.component';
import { NtDatePickerMultiYearComponent } from './multi-year.component';
import { NtDatePickerYearComponent } from './year.component';
export declare type NtDatePickerViewType = 'month' | 'year' | 'multi-year';
export declare class NtDatePickerCalendarComponent<D> implements AfterContentInit, OnChanges, OnDestroy {
    private _changeDetectorRef;
    private _dateAdapter;
    private _dateFormats;
    _viewType: NtDatePickerViewType;
    _currentView: NtDatePickerViewType;
    private _startAt;
    startAt: D | null;
    /** The currently selected date. */
    private _selected;
    selected: D | null;
    /** The minimum selectable date. */
    private _minDate;
    minDate: D | null;
    /** The maximum selectable date. */
    private _maxDate;
    maxDate: D | null;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when the currently selected date changes. */
    readonly selectedChange: EventEmitter<D>;
    /**
     * Emits the year chosen in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    readonly yearSelected: EventEmitter<D>;
    /**
     * Emits the month chosen in year view.
     * This doesn't imply a change on the selected date.
     */
    readonly monthSelected: EventEmitter<D>;
    /** Reference to the current month view component. */
    monthView: NtDatePickerMonthComponent<D>;
    /** Reference to the current year view component. */
    yearView: NtDatePickerYearComponent<D>;
    /** Reference to the current multi-year view component. */
    multiYearView: NtDatePickerMultiYearComponent<D>;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    private _clampedActiveDate;
    _activeDate: D;
    readonly _monthLabel: string;
    readonly _yearLabel: string;
    readonly _multiYearLabel: string;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateAdapter: DateAdapter<D>, _dateFormats: NtDateFormats);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    prevMonth(): void;
    nextMonth(): void;
    prevYear(): void;
    nextYear(): void;
    prevYearArray(): void;
    nextYearArray(): void;
    _init(): void;
    /** Handles date selection in the month view. */
    _dateSelected(date: D): void;
    /** Handles year selection in the multiyear view. */
    _yearSelectedInMultiYearView(normalizedYear: D): void;
    /** Handles month selection in the year view. */
    _monthSelectedInYearView(normalizedMonth: D): void;
    /** Handles year/month selection in the multi-year/year views. */
    _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj);
}
