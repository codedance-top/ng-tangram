import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation, ViewChild, ElementRef, NgZone, Renderer2, Self, NgModule } from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS, NtOverlayComponent, NtNativeDateModule, NtOverlayModule } from '@ng-tangram/components/core';
import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NgControl } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} provider
 * @return {?}
 */
function createMissingDateImplError(provider) {
    return Error(`NtDatepickerComponent: No provider found for ${provider}. You must import one of the following ` +
        `modules at your application root: NtNativeDateModule or provide a ` +
        `custom implementation.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtDatePickerCell {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} enabled
     */
    constructor(value, displayValue, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.enabled = enabled;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DAYS_PER_WEEK = 7;
const /** @type {?} */ DAYS_MAX_ROWS = 6;
/**
 * @template D
 */
class NtDatePickerMonthComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     */
    constructor(_changeDetectorRef, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.activeDateChange = new EventEmitter();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('NT_DATE_FORMATS');
        }
        const /** @type {?} */ firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
        const /** @type {?} */ narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
        const /** @type {?} */ longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        let /** @type {?} */ weekdays = longWeekdays.map((long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._dateAdapter.today();
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     * @return {?}
     */
    get activeDate() { return this._activeDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        const /** @type {?} */ oldActiveDate = this._activeDate;
        const /** @type {?} */ validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._selectedDate = this._getDateInCurrentMonth(this._selected);
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() { return this._minDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() { return this._maxDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new date is selected.
     * @param {?} cell
     * @return {?}
     */
    _dateSelected(cell) {
        if (cell.enabled && this._selectedDate !== cell.value) {
            const /** @type {?} */ selectedYear = this._dateAdapter.getYear(this.activeDate);
            const /** @type {?} */ selectedMonth = this._dateAdapter.getMonth(this.activeDate);
            const /** @type {?} */ selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, cell.value);
            this.selectedChange.emit(selectedDate);
        }
    }
    /**
     * @return {?}
     */
    _init() {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
        this._monthLabel = this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
            .toLocaleUpperCase();
        const /** @type {?} */ firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        this._firstWeekOffset = (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
            this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Creates MatCalendarCells for the dates in this month.
     * @return {?}
     */
    _createWeekCells() {
        const /** @type {?} */ daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        const /** @type {?} */ dateNames = this._dateAdapter.getDateNames();
        this._weeks = [[]];
        for (let /** @type {?} */ i = 0, /** @type {?} */ cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            const /** @type {?} */ date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
            const /** @type {?} */ enabled = this._shouldEnableDate(date);
            this._weeks[this._weeks.length - 1].push(new NtDatePickerCell(i + 1, dateNames[i], enabled));
        }
        this._fillBeforeCells();
        this._fillAfterCells();
    }
    /**
     * @return {?}
     */
    _getWeekOffset() {
        const /** @type {?} */ firstDayForCurrentMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        const /** @type {?} */ firstDayForWeek = this._dateAdapter.getDayOfWeek(firstDayForCurrentMonth);
        return firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() >= 0
            ? firstDayForWeek - this._dateAdapter.getFirstDayOfWeek()
            : firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() + DAYS_PER_WEEK;
    }
    /**
     * 在填满模式下 补充首行列
     * @return {?}
     */
    _fillBeforeCells() {
        const /** @type {?} */ beforeMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), -1);
        const /** @type {?} */ daysInBeforeMonth = this._dateAdapter.getNumDaysInMonth(beforeMonth);
        const /** @type {?} */ dateNames = this._dateAdapter.getDateNames();
        const /** @type {?} */ beforeWeeks = [];
        for (let /** @type {?} */ i = daysInBeforeMonth - this._firstWeekOffset; i < daysInBeforeMonth; i++) {
            beforeWeeks.push(new NtDatePickerCell(i + 1, dateNames[i], false));
        }
        this._weeks[0] = beforeWeeks.concat(this._weeks[0]);
    }
    /**
     * 在填满模式下 补充尾部列
     * @return {?}
     */
    _fillAfterCells() {
        const /** @type {?} */ afterMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), 1);
        const /** @type {?} */ lastRow = this._weeks[this._weeks.length - 1];
        const /** @type {?} */ dateNames = this._dateAdapter.getDateNames();
        const /** @type {?} */ afterWeeks = [], /** @type {?} */ afterRows = [];
        for (let /** @type {?} */ i = 0; i < DAYS_PER_WEEK - lastRow.length; i++) {
            afterWeeks.push(new NtDatePickerCell(i + 1, dateNames[i], false));
        }
        lastRow.push(...afterWeeks);
        for (let /** @type {?} */ i = 0; i < DAYS_PER_WEEK * (DAYS_MAX_ROWS - this._weeks.length); i++) {
            afterRows.push(new NtDatePickerCell(afterWeeks.length + i + 1, dateNames[afterWeeks.length + i], false));
        }
        this._weeks.push(...afterRows.map(_ => afterRows.splice(0, DAYS_PER_WEEK)).filter(row => !!row));
    }
    /**
     * Date filter for the month
     * @param {?} date
     * @return {?}
     */
    _shouldEnableDate(date) {
        return !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0);
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @param {?} date
     * @return {?}
     */
    _getDateInCurrentMonth(date) {
        return date && this._hasSameMonthAndYear(date, this.activeDate) ?
            this._dateAdapter.getDate(date) : null;
    }
    /**
     * Checks whether the 2 dates are non-null and fall within the same month of the same year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    _hasSameMonthAndYear(d1, d2) {
        return !!(d1 && d2 && this._dateAdapter.getMonth(d1) === this._dateAdapter.getMonth(d2) &&
            this._dateAdapter.getYear(d1) === this._dateAdapter.getYear(d2));
    }
    /**
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    }
}
NtDatePickerMonthComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-datepicker-month',
                template: "<table> <thead> <tr> <th *ngFor=\"let week of _weekdays\">{{week.narrow}}</th> </tr> </thead> <tbody> <tr *ngFor=\"let _rows of _weeks\"> <td *ngFor=\"let week of _rows\" [class.disabled]=\"!week.enabled\" [class.selected]=\"week.value === _selectedDate && week.enabled\" [class.active]=\"_todayDate === week.value && week.enabled\"> <span (click)=\"_dateSelected(week)\">{{ week.displayValue }}</span> </td> </tr> </tbody> </table> ",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'nt-datepicker-month'
                }
            },] },
];
/** @nocollapse */
NtDatePickerMonthComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DateAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_DATE_FORMATS,] },] },
];
NtDatePickerMonthComponent.propDecorators = {
    "activeDate": [{ type: Input },],
    "selected": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateFilter": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "activeDateChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ yearsPerPage = 12;
const /** @type {?} */ yearsPerRow = 3;
/**
 * @template D
 */
class NtDatePickerMultiYearComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dateAdapter
     */
    constructor(_changeDetectorRef, _dateAdapter) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateAdapter = _dateAdapter;
        /**
         * Emits when a new year is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.yearSelected = new EventEmitter();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this._dateAdapter.today();
    }
    /**
     * @return {?}
     */
    get activeDate() { return this._activeDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        let /** @type {?} */ oldActiveDate = this._activeDate;
        const /** @type {?} */ validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (Math.floor(this._dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
            Math.floor(this._dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
            this._init();
        }
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() { return this._minDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() { return this._maxDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * @return {?}
     */
    _init() {
        this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
        let /** @type {?} */ activeYear = this._dateAdapter.getYear(this._activeDate);
        let /** @type {?} */ activeOffset = activeYear % yearsPerPage;
        this._years = [];
        for (let /** @type {?} */ i = 0, /** @type {?} */ row = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this._years.push(row.map(year => this._createCellForYear(year)));
                row = [];
            }
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Handles when a new year is selected.
     * @param {?} year
     * @return {?}
     */
    _yearSelected(year) {
        this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
        let /** @type {?} */ month = this._dateAdapter.getMonth(this.activeDate);
        let /** @type {?} */ daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
    }
    /**
     * Creates an MatCalendarCell for the given year.
     * @param {?} year
     * @return {?}
     */
    _createCellForYear(year) {
        let /** @type {?} */ yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));
        return new NtDatePickerCell(year, yearName, this._shouldEnableYear(year));
    }
    /**
     * Whether the given year is enabled.
     * @param {?} year
     * @return {?}
     */
    _shouldEnableYear(year) {
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
        const /** @type {?} */ firstOfYear = this._dateAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (let /** @type {?} */ date = firstOfYear; this._dateAdapter.getYear(date) === year; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    }
}
NtDatePickerMultiYearComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-datepicker-multi-year',
                template: "<table> <tbody> <tr *ngFor=\"let _rows of _years\"> <td *ngFor=\"let year of _rows\" [class.disabled]=\"!year.enabled\" [class.selected]=\"year.value === _selectedYear && year.enabled\" (click)=\"_yearSelected(year.value)\"> <span *ngIf=\"year.enabled\">{{ year.displayValue }}</span> <span *ngIf=\"!year.enabled\">{{ year.displayValue }}</span> </td> </tr> </tbody> </table> ",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'nt-datepicker-multi-year'
                }
            },] },
];
/** @nocollapse */
NtDatePickerMultiYearComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DateAdapter, decorators: [{ type: Optional },] },
];
NtDatePickerMultiYearComponent.propDecorators = {
    "activeDate": [{ type: Input },],
    "selected": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateFilter": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "yearSelected": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template D
 */
class NtDatePickerYearComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     */
    constructor(_changeDetectorRef, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the selected month. This doesn't imply a change on the selected date
         */
        this.monthSelected = new EventEmitter();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('NT_DATE_FORMATS');
        }
        this._activeDate = this._dateAdapter.today();
    }
    /**
     * @return {?}
     */
    get activeDate() { return this._activeDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        let /** @type {?} */ oldActiveDate = this._activeDate;
        const /** @type {?} */ validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
            this._init();
        }
    }
    /**
     * @return {?}
     */
    get activeYear() { return this._activeDate ? this._dateAdapter.getYear(this._activeDate) : null; }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._selectedMonth = this._getMonthInCurrentYear(this._selected);
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() { return this._minDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() { return this._maxDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * @return {?}
     */
    _init() {
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
        const /** @type {?} */ monthNames = this._dateAdapter.getMonthNames('short');
        this._months = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map(row => row.map(month => this._createCellForMonth(month, monthNames[month])));
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
        const /** @type {?} */ normalizedDate = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
        this.monthSelected.emit(normalizedDate);
        const /** @type {?} */ daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);
        this.selectedChange.emit(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
    }
    /**
     * Creates an MatCalendarCell for the given month.
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    _createCellForMonth(month, monthName) {
        return new NtDatePickerCell(month, monthName.toLocaleUpperCase(), this._shouldEnableMonth(month));
    }
    /**
     * Whether the given month is enabled.
     * @param {?} month
     * @return {?}
     */
    _shouldEnableMonth(month) {
        const /** @type {?} */ activeYear = this._dateAdapter.getYear(this.activeDate);
        if (month === undefined || month === null ||
            this._isYearAndMonthAfterMaxDate(activeYear, month) ||
            this._isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        const /** @type {?} */ firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (let /** @type {?} */ date = firstOfMonth; this._dateAdapter.getMonth(date) === month; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    _isYearAndMonthAfterMaxDate(year, month) {
        if (this.maxDate) {
            const /** @type {?} */ maxYear = this._dateAdapter.getYear(this.maxDate);
            const /** @type {?} */ maxMonth = this._dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    }
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    _isYearAndMonthBeforeMinDate(year, month) {
        if (this.minDate) {
            const /** @type {?} */ minYear = this._dateAdapter.getYear(this.minDate);
            const /** @type {?} */ minMonth = this._dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
        return false;
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @param {?} date
     * @return {?}
     */
    _getMonthInCurrentYear(date) {
        return date && this._dateAdapter.getYear(date) === this._dateAdapter.getYear(this.activeDate) ?
            this._dateAdapter.getMonth(date) : null;
    }
    /**
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    }
}
NtDatePickerYearComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-datepicker-year',
                template: "<table> <tbody> <tr *ngFor=\"let _rows of _months\"> <td *ngFor=\"let month of _rows\" [class.disabled]=\"!month.enabled\" [class.selected]=\"month.value === _selectedMonth && month.enabled\" (click)=\"_monthSelected(month.value)\"> <span *ngIf=\"month.enabled\">{{ month.displayValue }}</span> <span *ngIf=\"!month.enabled\">{{ month.displayValue }}</span> </td> </tr> </tbody> </table> ",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'nt-datepicker-year'
                }
            },] },
];
/** @nocollapse */
NtDatePickerYearComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DateAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_DATE_FORMATS,] },] },
];
NtDatePickerYearComponent.propDecorators = {
    "activeDate": [{ type: Input },],
    "selected": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateFilter": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "monthSelected": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template D
 */
class NtDatePickerCalendarComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     */
    constructor(_changeDetectorRef, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._viewType = 'month';
        this._currentView = 'month';
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits the year chosen in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the month chosen in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('NT_DATE_FORMATS');
        }
    }
    /**
     * @return {?}
     */
    get startAt() { return this._startAt; }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) { this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @return {?}
     */
    get minDate() { return this._minDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @return {?}
     */
    get maxDate() { return this._maxDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @return {?}
     */
    get _activeDate() { return this._clampedActiveDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _activeDate(value) { this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate); }
    /**
     * @return {?}
     */
    get _monthLabel() {
        return this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthYearLabel).toLocaleUpperCase();
    }
    /**
     * @return {?}
     */
    get _yearLabel() { return this._dateAdapter.getYearName(this._activeDate); }
    /**
     * @return {?}
     */
    get _multiYearLabel() {
        const /** @type {?} */ activeYear = this._dateAdapter.getYear(this._activeDate);
        const /** @type {?} */ firstYearInView = this._dateAdapter.getYearName(this._dateAdapter.createDate(activeYear - activeYear % yearsPerPage, 0, 1), 'en-US');
        const /** @type {?} */ lastYearInView = this._dateAdapter.getYearName(this._dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % yearsPerPage, 0, 1), 'en-US');
        return `${firstYearInView} \u2013 ${lastYearInView}`;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ change = changes["minDate"] || changes["maxDate"] || changes["dateFilter"];
        if (change && !change.firstChange) {
            const /** @type {?} */ view = this.monthView || this.yearView || this.multiYearView;
            if (view) {
                view._init();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // throw new Error("Method not implemented.");
    }
    /**
     * @return {?}
     */
    prevMonth() {
        this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -1);
    }
    /**
     * @return {?}
     */
    nextMonth() {
        this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
    }
    /**
     * @return {?}
     */
    prevYear() {
        this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -1);
    }
    /**
     * @return {?}
     */
    nextYear() {
        this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, 1);
    }
    /**
     * @return {?}
     */
    prevYearArray() {
        this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerPage);
    }
    /**
     * @return {?}
     */
    nextYearArray() {
        this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerPage);
    }
    /**
     * @return {?}
     */
    _init() {
        this._activeDate = this.startAt || this._dateAdapter.today();
        this._currentView = this._viewType;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        if (!this._dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    }
    /**
     * Handles year selection in the multiyear view.
     * @param {?} normalizedYear
     * @return {?}
     */
    _yearSelectedInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Handles month selection in the year view.
     * @param {?} normalizedMonth
     * @return {?}
     */
    _monthSelectedInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Handles year/month selection in the multi-year/year views.
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    _goToDateInView(date, view) {
        this._activeDate = date;
        this._currentView = view;
    }
    /**
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    }
}
NtDatePickerCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-datepicker-calendar',
                template: "<div class=\"nt-datepicker-pane\" [ngSwitch]=\"_currentView\"> <table> <thead> <tr *ngSwitchCase=\"'month'\"><ng-container *ngTemplateOutlet=\"monthControl\"></ng-container></tr> <tr *ngSwitchCase=\"'year'\"><ng-container *ngTemplateOutlet=\"yearControl\"></ng-container></tr> <tr *ngSwitchCase=\"'multi-year'\"><ng-container *ngTemplateOutlet=\"multiYearControl\"></ng-container></tr> </thead> </table> <nt-datepicker-month *ngSwitchCase=\"'month'\" [(activeDate)]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (selectedChange)=\"_dateSelected($event)\"> </nt-datepicker-month> <nt-datepicker-year *ngSwitchCase=\"'year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (monthSelected)=\"_monthSelectedInYearView($event)\" (selectedChange)=\"_goToDateInView($event, 'month')\"> </nt-datepicker-year> <nt-datepicker-multi-year *ngSwitchCase=\"'multi-year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (yearSelected)=\"_yearSelectedInMultiYearView($event)\" (selectedChange)=\"_goToDateInView($event, 'year')\"> </nt-datepicker-multi-year> </div> <ng-template #monthControl> <th (click)=\"prevYear()\" [class.disabled]=\"\"><span>&laquo;</span></th> <th (click)=\"prevMonth()\" [class.disabled]=\"\"><span>&lsaquo;</span></th> <th colspan=\"3\"> <span (click)=\" _currentView = 'multi-year' \">{{ _yearLabel }}</span> <span (click)=\" _currentView = 'year' \">{{ _monthLabel }}</span> </th> <th (click)=\"nextMonth()\" [class.disabled]=\"\"><span>&rsaquo;</span></th> <th (click)=\"nextYear()\" [class.disabled]=\"\"><span>&raquo;</span></th> </ng-template> <ng-template #yearControl> <th (click)=\"prevYear()\" [class.disabled]=\"\"><span>&laquo;</span></th> <th>&nbsp;</th> <th colspan=\"3\"> <span (click)=\" _currentView = 'multi-year' \">{{ _yearLabel }}</span> </th> <th>&nbsp;</th> <th (click)=\"nextYear()\" [class.disabled]=\"\"><span>&raquo;</span></th> </ng-template> <ng-template #multiYearControl> <th (click)=\"prevYearArray()\"><span>&laquo;</span></th> <th>&nbsp;</th> <th colspan=\"3\">{{_multiYearLabel}}</th> <th>&nbsp;</th> <th (click)=\"nextYearArray()\"><span>&raquo;</span></th> </ng-template> ",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NtDatePickerCalendarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DateAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_DATE_FORMATS,] },] },
];
NtDatePickerCalendarComponent.propDecorators = {
    "startAt": [{ type: Input },],
    "selected": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateFilter": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "yearSelected": [{ type: Output },],
    "monthSelected": [{ type: Output },],
    "monthView": [{ type: ViewChild, args: [NtDatePickerMonthComponent,] },],
    "yearView": [{ type: ViewChild, args: [NtDatePickerYearComponent,] },],
    "multiYearView": [{ type: ViewChild, args: [NtDatePickerMultiYearComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template D
 */
class NtDatePickerComponent extends NtFormFieldControl {
    /**
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} ngControl
     */
    constructor(_dateAdapter, _dateFormats, _elementRef, _ngZone, _renderer, ngControl) {
        super();
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this._disabled = false;
        this._lastValueValid = false;
        this._readonly = false;
        this._required = false;
        this._focused = false;
        this.placeholder = '';
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new EventEmitter();
        this._onChange = () => { };
        this._onTouched = () => { };
        this.origin = new OverlayOrigin(_elementRef);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * @return {?}
     */
    get empty() { return !this.value; }
    /**
     * @return {?}
     */
    get focused() { return this._focused; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        value = this._dateAdapter.deserialize(value);
        this._lastValueValid = !value || this._dateAdapter.isValid(value);
        value = this._getValidDateOrNull(value);
        const /** @type {?} */ oldDate = this.value;
        this._value = value;
        this.inputElement.nativeElement.value = value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @return {?}
     */
    get startAt() { return this._startAt || this.value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @return {?}
     */
    get minDate() { return this._minDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @return {?}
     */
    get maxDate() { return this._maxDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @return {?}
     */
    _onInputFocus() {
        if (!this.disabled) {
            this.overlay.show();
        }
    }
    /**
     * @return {?}
     */
    onOpen() {
        this._focused = true;
        this.calendar._init();
    }
    /**
     * @return {?}
     */
    onClose() {
        this._focused = false;
        typeof this._onTouched === 'function' && this._onTouched();
    }
    /**
     * @return {?}
     */
    focus() {
        if (!this.disabled) {
            this.inputElement.nativeElement.focus();
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    select(date) {
        this.value = date;
        this.overlay.hide();
        this._onChange(date);
    }
    /**
     * @return {?}
     */
    clear() {
        if (this.value !== null && !this.disabled) {
            this.value = null;
            this._onChange(this.value);
        }
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
    }
    /**
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    }
}
NtDatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-datepicker',
                template: "<input #inputElement type=\"text\" (focus)=\"_onInputFocus()\" readonly [placeholder]=\"placeholder\" [disabled]=\"disabled\"> <span class=\"nt-datepicker-caret\" [@fade] *ngIf=\"!value || disabled\"></span> <span class=\"nt-datepicker-clear\" (click)=\"clear()\" [@fade] *ngIf=\"value && !disabled\"></span> <nt-overlay [origin]=\"origin\" trigger=\"click\" position=\"bottomLeft\" arrow (opened)=\"onOpen()\" (closed)=\"onClose()\"> <nt-datepicker-calendar [selected]=\"value\" [dateFilter]=\"dateFilter\" [startAt]=\"startAt\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (selectedChange)=\"select($event)\"> </nt-datepicker-calendar> </nt-overlay> ",
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'nt-datepicker nt-form-control',
                    '[class.focus]': 'overlay.isOpen'
                },
                animations: [
                    trigger('fade', [
                        transition('* => void', fadeOut(.15)),
                        transition('void => *', fadeIn(.15))
                    ])
                ],
                providers: [
                    { provide: NtFormFieldControl, useExisting: NtDatePickerComponent }
                ]
            },] },
];
/** @nocollapse */
NtDatePickerComponent.ctorParameters = () => [
    { type: DateAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_DATE_FORMATS,] },] },
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer2, },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
];
NtDatePickerComponent.propDecorators = {
    "placeholder": [{ type: Input },],
    "disabled": [{ type: Input },],
    "required": [{ type: Input },],
    "readonly": [{ type: Input },],
    "startAt": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateFilter": [{ type: Input },],
    "inputElement": [{ type: ViewChild, args: ['inputElement',] },],
    "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
    "calendar": [{ type: ViewChild, args: [NtDatePickerCalendarComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtDatePickerModule {
}
NtDatePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NtOverlayModule, NtNativeDateModule],
                exports: [NtDatePickerComponent],
                declarations: [
                    NtDatePickerComponent,
                    NtDatePickerCalendarComponent,
                    NtDatePickerMonthComponent,
                    NtDatePickerYearComponent,
                    NtDatePickerMultiYearComponent
                ]
            },] },
];
/** @nocollapse */
NtDatePickerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtDatePickerModule, NtDatePickerComponent, createMissingDateImplError, NtDatePickerCell, NtDatePickerCalendarComponent, NtDatePickerMonthComponent, yearsPerPage, yearsPerRow, NtDatePickerMultiYearComponent, NtDatePickerYearComponent };
//# sourceMappingURL=datepicker.js.map
