(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ng-tangram/components/core'), require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/cdk/overlay'), require('@angular/forms'), require('@ng-tangram/animate/fading'), require('@ng-tangram/components/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@ng-tangram/components/core', '@angular/animations', '@angular/cdk/coercion', '@angular/cdk/overlay', '@angular/forms', '@ng-tangram/animate/fading', '@ng-tangram/components/forms', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.datepicker = {}),global.ng.core,global.nt.components.core,global.ng.animations,global.ng.cdk.coercion,global.ng.cdk.overlay,global.ng.forms,global.nt.animate.fading,global.nt.components.forms,global.ng.common));
}(this, (function (exports,core,core$1,animations,coercion,overlay,forms,fading,forms$1,common) { 'use strict';

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
        return Error("NtDatepickerComponent: No provider found for " + provider + ". You must import one of the following " +
            "modules at your application root: NtNativeDateModule or provide a " +
            "custom implementation.");
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtDatePickerCell = /** @class */ (function () {
        function NtDatePickerCell(value, displayValue, enabled) {
            this.value = value;
            this.displayValue = displayValue;
            this.enabled = enabled;
        }
        return NtDatePickerCell;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ DAYS_PER_WEEK = 7;
    var /** @type {?} */ DAYS_MAX_ROWS = 6;
    /**
     * @template D
     */
    var NtDatePickerMonthComponent = /** @class */ (function () {
        function NtDatePickerMonthComponent(_changeDetectorRef, _dateAdapter, _dateFormats) {
            this._changeDetectorRef = _changeDetectorRef;
            this._dateAdapter = _dateAdapter;
            this._dateFormats = _dateFormats;
            /**
             * Emits when a new date is selected.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.activeDateChange = new core.EventEmitter();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('NT_DATE_FORMATS');
            }
            var /** @type {?} */ firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
            var /** @type {?} */ narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
            var /** @type {?} */ longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
            // Rotate the labels for days of the week based on the configured first day of the week.
            var /** @type {?} */ weekdays = longWeekdays.map(function (long, i) {
                return { long: long, narrow: narrowWeekdays[i] };
            });
            this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
            this._activeDate = this._dateAdapter.today();
        }
        Object.defineProperty(NtDatePickerMonthComponent.prototype, "activeDate", {
            get: /**
             * The date to display in this month view (everything other than the month and year is ignored).
             * @return {?}
             */
            function () { return this._activeDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var /** @type {?} */ oldActiveDate = this._activeDate;
                var /** @type {?} */ validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerMonthComponent.prototype, "selected", {
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () { return this._selected; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._selectedDate = this._getDateInCurrentMonth(this._selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerMonthComponent.prototype, "minDate", {
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () { return this._minDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerMonthComponent.prototype, "maxDate", {
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () { return this._maxDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        /** Handles when a new date is selected. */
        /**
         * Handles when a new date is selected.
         * @param {?} cell
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._dateSelected = /**
         * Handles when a new date is selected.
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            if (cell.enabled && this._selectedDate !== cell.value) {
                var /** @type {?} */ selectedYear = this._dateAdapter.getYear(this.activeDate);
                var /** @type {?} */ selectedMonth = this._dateAdapter.getMonth(this.activeDate);
                var /** @type {?} */ selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, cell.value);
                this.selectedChange.emit(selectedDate);
            }
        };
        /**
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._init = /**
         * @return {?}
         */
        function () {
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
            this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
            this._monthLabel = this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
                .toLocaleUpperCase();
            var /** @type {?} */ firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
            this._firstWeekOffset = (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
                this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
            this._createWeekCells();
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Creates MatCalendarCells for the dates in this month.
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._createWeekCells = /**
         * Creates MatCalendarCells for the dates in this month.
         * @return {?}
         */
        function () {
            var /** @type {?} */ daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
            var /** @type {?} */ dateNames = this._dateAdapter.getDateNames();
            this._weeks = [[]];
            for (var /** @type {?} */ i = 0, /** @type {?} */ cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
                if (cell === DAYS_PER_WEEK) {
                    this._weeks.push([]);
                    cell = 0;
                }
                var /** @type {?} */ date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
                var /** @type {?} */ enabled = this._shouldEnableDate(date);
                this._weeks[this._weeks.length - 1].push(new NtDatePickerCell(i + 1, dateNames[i], enabled));
            }
            this._fillBeforeCells();
            this._fillAfterCells();
        };
        /**
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._getWeekOffset = /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ firstDayForCurrentMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
            var /** @type {?} */ firstDayForWeek = this._dateAdapter.getDayOfWeek(firstDayForCurrentMonth);
            return firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() >= 0
                ? firstDayForWeek - this._dateAdapter.getFirstDayOfWeek()
                : firstDayForWeek - this._dateAdapter.getFirstDayOfWeek() + DAYS_PER_WEEK;
        };
        /**
         * 在填满模式下 补充首行列
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._fillBeforeCells = /**
         * 在填满模式下 补充首行列
         * @return {?}
         */
        function () {
            var /** @type {?} */ beforeMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), -1);
            var /** @type {?} */ daysInBeforeMonth = this._dateAdapter.getNumDaysInMonth(beforeMonth);
            var /** @type {?} */ dateNames = this._dateAdapter.getDateNames();
            var /** @type {?} */ beforeWeeks = [];
            for (var /** @type {?} */ i = daysInBeforeMonth - this._firstWeekOffset; i < daysInBeforeMonth; i++) {
                beforeWeeks.push(new NtDatePickerCell(i + 1, dateNames[i], false));
            }
            this._weeks[0] = beforeWeeks.concat(this._weeks[0]);
        };
        /**
         * 在填满模式下 补充尾部列
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._fillAfterCells = /**
         * 在填满模式下 补充尾部列
         * @return {?}
         */
        function () {
            var /** @type {?} */ afterMonth = this._dateAdapter.addCalendarMonths(this._dateAdapter.clone(this.activeDate), 1);
            var /** @type {?} */ lastRow = this._weeks[this._weeks.length - 1];
            var /** @type {?} */ dateNames = this._dateAdapter.getDateNames();
            var /** @type {?} */ afterWeeks = [], /** @type {?} */ afterRows = [];
            for (var /** @type {?} */ i = 0; i < DAYS_PER_WEEK - lastRow.length; i++) {
                afterWeeks.push(new NtDatePickerCell(i + 1, dateNames[i], false));
            }
            lastRow.push.apply(lastRow, afterWeeks);
            for (var /** @type {?} */ i = 0; i < DAYS_PER_WEEK * (DAYS_MAX_ROWS - this._weeks.length); i++) {
                afterRows.push(new NtDatePickerCell(afterWeeks.length + i + 1, dateNames[afterWeeks.length + i], false));
            }
            (_a = this._weeks).push.apply(_a, afterRows.map(function (_) { return afterRows.splice(0, DAYS_PER_WEEK); }).filter(function (row) { return !!row; }));
            var _a;
        };
        /**
         * Date filter for the month
         * @param {?} date
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._shouldEnableDate = /**
         * Date filter for the month
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return !!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0);
        };
        /**
         * Gets the date in this month that the given Date falls on.
         * Returns null if the given Date is in another month.
         * @param {?} date
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._getDateInCurrentMonth = /**
         * Gets the date in this month that the given Date falls on.
         * Returns null if the given Date is in another month.
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date && this._hasSameMonthAndYear(date, this.activeDate) ?
                this._dateAdapter.getDate(date) : null;
        };
        /**
         * Checks whether the 2 dates are non-null and fall within the same month of the same year.
         * @param {?} d1
         * @param {?} d2
         * @return {?}
         */
        NtDatePickerMonthComponent.prototype._hasSameMonthAndYear = /**
         * Checks whether the 2 dates are non-null and fall within the same month of the same year.
         * @param {?} d1
         * @param {?} d2
         * @return {?}
         */
        function (d1, d2) {
            return !!(d1 && d2 && this._dateAdapter.getMonth(d1) === this._dateAdapter.getMonth(d2) &&
                this._dateAdapter.getYear(d1) === this._dateAdapter.getYear(d2));
        };
        /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        NtDatePickerMonthComponent.prototype._getValidDateOrNull = /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
        };
        NtDatePickerMonthComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-datepicker-month',
                        template: "<table> <thead> <tr> <th *ngFor=\"let week of _weekdays\">{{week.narrow}}</th> </tr> </thead> <tbody> <tr *ngFor=\"let _rows of _weeks\"> <td *ngFor=\"let week of _rows\" [class.disabled]=\"!week.enabled\" [class.selected]=\"week.value === _selectedDate && week.enabled\" [class.active]=\"_todayDate === week.value && week.enabled\"> <span (click)=\"_dateSelected(week)\">{{ week.displayValue }}</span> </td> </tr> </tbody> </table> ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'nt-datepicker-month'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtDatePickerMonthComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef, },
            { type: core$1.DateAdapter, decorators: [{ type: core.Optional },] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.NT_DATE_FORMATS,] },] },
        ]; };
        NtDatePickerMonthComponent.propDecorators = {
            "activeDate": [{ type: core.Input },],
            "selected": [{ type: core.Input },],
            "minDate": [{ type: core.Input },],
            "maxDate": [{ type: core.Input },],
            "dateFilter": [{ type: core.Input },],
            "selectedChange": [{ type: core.Output },],
            "activeDateChange": [{ type: core.Output },],
        };
        return NtDatePickerMonthComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ yearsPerPage = 12;
    var /** @type {?} */ yearsPerRow = 3;
    /**
     * @template D
     */
    var NtDatePickerMultiYearComponent = /** @class */ (function () {
        function NtDatePickerMultiYearComponent(_changeDetectorRef, _dateAdapter) {
            this._changeDetectorRef = _changeDetectorRef;
            this._dateAdapter = _dateAdapter;
            /**
             * Emits when a new year is selected.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             */
            this.yearSelected = new core.EventEmitter();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            this._activeDate = this._dateAdapter.today();
        }
        Object.defineProperty(NtDatePickerMultiYearComponent.prototype, "activeDate", {
            get: /**
             * @return {?}
             */
            function () { return this._activeDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var /** @type {?} */ oldActiveDate = this._activeDate;
                var /** @type {?} */ validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (Math.floor(this._dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
                    Math.floor(this._dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerMultiYearComponent.prototype, "selected", {
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () { return this._selected; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerMultiYearComponent.prototype, "minDate", {
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () { return this._minDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerMultiYearComponent.prototype, "maxDate", {
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () { return this._maxDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtDatePickerMultiYearComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        /**
         * @return {?}
         */
        NtDatePickerMultiYearComponent.prototype._init = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
            var /** @type {?} */ activeYear = this._dateAdapter.getYear(this._activeDate);
            var /** @type {?} */ activeOffset = activeYear % yearsPerPage;
            this._years = [];
            for (var /** @type {?} */ i = 0, /** @type {?} */ row = []; i < yearsPerPage; i++) {
                row.push(activeYear - activeOffset + i);
                if (row.length === yearsPerRow) {
                    this._years.push(row.map(function (year) { return _this._createCellForYear(year); }));
                    row = [];
                }
            }
            this._changeDetectorRef.markForCheck();
        };
        /** Handles when a new year is selected. */
        /**
         * Handles when a new year is selected.
         * @param {?} year
         * @return {?}
         */
        NtDatePickerMultiYearComponent.prototype._yearSelected = /**
         * Handles when a new year is selected.
         * @param {?} year
         * @return {?}
         */
        function (year) {
            this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
            var /** @type {?} */ month = this._dateAdapter.getMonth(this.activeDate);
            var /** @type {?} */ daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
            this.selectedChange.emit(this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
        };
        /**
         * Creates an MatCalendarCell for the given year.
         * @param {?} year
         * @return {?}
         */
        NtDatePickerMultiYearComponent.prototype._createCellForYear = /**
         * Creates an MatCalendarCell for the given year.
         * @param {?} year
         * @return {?}
         */
        function (year) {
            var /** @type {?} */ yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));
            return new NtDatePickerCell(year, yearName, this._shouldEnableYear(year));
        };
        /**
         * Whether the given year is enabled.
         * @param {?} year
         * @return {?}
         */
        NtDatePickerMultiYearComponent.prototype._shouldEnableYear = /**
         * Whether the given year is enabled.
         * @param {?} year
         * @return {?}
         */
        function (year) {
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
            var /** @type {?} */ firstOfYear = this._dateAdapter.createDate(year, 0, 1);
            // If any date in the year is enabled count the year as enabled.
            for (var /** @type {?} */ date = firstOfYear; this._dateAdapter.getYear(date) === year; date = this._dateAdapter.addCalendarDays(date, 1)) {
                if (this.dateFilter(date)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        NtDatePickerMultiYearComponent.prototype._getValidDateOrNull = /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
        };
        NtDatePickerMultiYearComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-datepicker-multi-year',
                        template: "<table> <tbody> <tr *ngFor=\"let _rows of _years\"> <td *ngFor=\"let year of _rows\" [class.disabled]=\"!year.enabled\" [class.selected]=\"year.value === _selectedYear && year.enabled\" (click)=\"_yearSelected(year.value)\"> <span *ngIf=\"year.enabled\">{{ year.displayValue }}</span> <span *ngIf=\"!year.enabled\">{{ year.displayValue }}</span> </td> </tr> </tbody> </table> ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'nt-datepicker-multi-year'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtDatePickerMultiYearComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef, },
            { type: core$1.DateAdapter, decorators: [{ type: core.Optional },] },
        ]; };
        NtDatePickerMultiYearComponent.propDecorators = {
            "activeDate": [{ type: core.Input },],
            "selected": [{ type: core.Input },],
            "minDate": [{ type: core.Input },],
            "maxDate": [{ type: core.Input },],
            "dateFilter": [{ type: core.Input },],
            "selectedChange": [{ type: core.Output },],
            "yearSelected": [{ type: core.Output },],
        };
        return NtDatePickerMultiYearComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @template D
     */
    var NtDatePickerYearComponent = /** @class */ (function () {
        function NtDatePickerYearComponent(_changeDetectorRef, _dateAdapter, _dateFormats) {
            this._changeDetectorRef = _changeDetectorRef;
            this._dateAdapter = _dateAdapter;
            this._dateFormats = _dateFormats;
            /**
             * Emits when a new month is selected.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits the selected month. This doesn't imply a change on the selected date
             */
            this.monthSelected = new core.EventEmitter();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('NT_DATE_FORMATS');
            }
            this._activeDate = this._dateAdapter.today();
        }
        Object.defineProperty(NtDatePickerYearComponent.prototype, "activeDate", {
            get: /**
             * @return {?}
             */
            function () { return this._activeDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var /** @type {?} */ oldActiveDate = this._activeDate;
                var /** @type {?} */ validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerYearComponent.prototype, "activeYear", {
            get: /**
             * @return {?}
             */
            function () { return this._activeDate ? this._dateAdapter.getYear(this._activeDate) : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerYearComponent.prototype, "selected", {
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () { return this._selected; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._selectedMonth = this._getMonthInCurrentYear(this._selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerYearComponent.prototype, "minDate", {
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () { return this._minDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerYearComponent.prototype, "maxDate", {
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () { return this._maxDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtDatePickerYearComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        /**
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._init = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._selectedMonth = this._getMonthInCurrentYear(this.selected);
            this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
            var /** @type {?} */ monthNames = this._dateAdapter.getMonthNames('short');
            this._months = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]].map(function (row) {
                return row.map(function (month) { return _this._createCellForMonth(month, monthNames[month]); });
            });
            this._changeDetectorRef.markForCheck();
        };
        /** Handles when a new month is selected. */
        /**
         * Handles when a new month is selected.
         * @param {?} month
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._monthSelected = /**
         * Handles when a new month is selected.
         * @param {?} month
         * @return {?}
         */
        function (month) {
            var /** @type {?} */ normalizedDate = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
            this.monthSelected.emit(normalizedDate);
            var /** @type {?} */ daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);
            this.selectedChange.emit(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
        };
        /**
         * Creates an MatCalendarCell for the given month.
         * @param {?} month
         * @param {?} monthName
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._createCellForMonth = /**
         * Creates an MatCalendarCell for the given month.
         * @param {?} month
         * @param {?} monthName
         * @return {?}
         */
        function (month, monthName) {
            return new NtDatePickerCell(month, monthName.toLocaleUpperCase(), this._shouldEnableMonth(month));
        };
        /**
         * Whether the given month is enabled.
         * @param {?} month
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._shouldEnableMonth = /**
         * Whether the given month is enabled.
         * @param {?} month
         * @return {?}
         */
        function (month) {
            var /** @type {?} */ activeYear = this._dateAdapter.getYear(this.activeDate);
            if (month === undefined || month === null ||
                this._isYearAndMonthAfterMaxDate(activeYear, month) ||
                this._isYearAndMonthBeforeMinDate(activeYear, month)) {
                return false;
            }
            if (!this.dateFilter) {
                return true;
            }
            var /** @type {?} */ firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
            // If any date in the month is enabled count the month as enabled.
            for (var /** @type {?} */ date = firstOfMonth; this._dateAdapter.getMonth(date) === month; date = this._dateAdapter.addCalendarDays(date, 1)) {
                if (this.dateFilter(date)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Tests whether the combination month/year is after this.maxDate, considering
         * just the month and year of this.maxDate
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._isYearAndMonthAfterMaxDate = /**
         * Tests whether the combination month/year is after this.maxDate, considering
         * just the month and year of this.maxDate
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        function (year, month) {
            if (this.maxDate) {
                var /** @type {?} */ maxYear = this._dateAdapter.getYear(this.maxDate);
                var /** @type {?} */ maxMonth = this._dateAdapter.getMonth(this.maxDate);
                return year > maxYear || (year === maxYear && month > maxMonth);
            }
            return false;
        };
        /**
         * Tests whether the combination month/year is before this.minDate, considering
         * just the month and year of this.minDate
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._isYearAndMonthBeforeMinDate = /**
         * Tests whether the combination month/year is before this.minDate, considering
         * just the month and year of this.minDate
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        function (year, month) {
            if (this.minDate) {
                var /** @type {?} */ minYear = this._dateAdapter.getYear(this.minDate);
                var /** @type {?} */ minMonth = this._dateAdapter.getMonth(this.minDate);
                return year < minYear || (year === minYear && month < minMonth);
            }
            return false;
        };
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @param {?} date
         * @return {?}
         */
        NtDatePickerYearComponent.prototype._getMonthInCurrentYear = /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date && this._dateAdapter.getYear(date) === this._dateAdapter.getYear(this.activeDate) ?
                this._dateAdapter.getMonth(date) : null;
        };
        /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        NtDatePickerYearComponent.prototype._getValidDateOrNull = /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
        };
        NtDatePickerYearComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-datepicker-year',
                        template: "<table> <tbody> <tr *ngFor=\"let _rows of _months\"> <td *ngFor=\"let month of _rows\" [class.disabled]=\"!month.enabled\" [class.selected]=\"month.value === _selectedMonth && month.enabled\" (click)=\"_monthSelected(month.value)\"> <span *ngIf=\"month.enabled\">{{ month.displayValue }}</span> <span *ngIf=\"!month.enabled\">{{ month.displayValue }}</span> </td> </tr> </tbody> </table> ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'nt-datepicker-year'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtDatePickerYearComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef, },
            { type: core$1.DateAdapter, decorators: [{ type: core.Optional },] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.NT_DATE_FORMATS,] },] },
        ]; };
        NtDatePickerYearComponent.propDecorators = {
            "activeDate": [{ type: core.Input },],
            "selected": [{ type: core.Input },],
            "minDate": [{ type: core.Input },],
            "maxDate": [{ type: core.Input },],
            "dateFilter": [{ type: core.Input },],
            "selectedChange": [{ type: core.Output },],
            "monthSelected": [{ type: core.Output },],
        };
        return NtDatePickerYearComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @template D
     */
    var NtDatePickerCalendarComponent = /** @class */ (function () {
        function NtDatePickerCalendarComponent(_changeDetectorRef, _dateAdapter, _dateFormats) {
            this._changeDetectorRef = _changeDetectorRef;
            this._dateAdapter = _dateAdapter;
            this._dateFormats = _dateFormats;
            this._viewType = 'month';
            this._currentView = 'month';
            /**
             * Emits when the currently selected date changes.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits the year chosen in multiyear view.
             * This doesn't imply a change on the selected date.
             */
            this.yearSelected = new core.EventEmitter();
            /**
             * Emits the month chosen in year view.
             * This doesn't imply a change on the selected date.
             */
            this.monthSelected = new core.EventEmitter();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('NT_DATE_FORMATS');
            }
        }
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "startAt", {
            get: /**
             * @return {?}
             */
            function () { return this._startAt; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () { return this._selected; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "minDate", {
            get: /**
             * @return {?}
             */
            function () { return this._minDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "maxDate", {
            get: /**
             * @return {?}
             */
            function () { return this._maxDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "_activeDate", {
            get: /**
             * @return {?}
             */
            function () { return this._clampedActiveDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "_monthLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthYearLabel).toLocaleUpperCase();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "_yearLabel", {
            get: /**
             * @return {?}
             */
            function () { return this._dateAdapter.getYearName(this._activeDate); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerCalendarComponent.prototype, "_multiYearLabel", {
            get: /**
             * @return {?}
             */
            function () {
                var /** @type {?} */ activeYear = this._dateAdapter.getYear(this._activeDate);
                var /** @type {?} */ firstYearInView = this._dateAdapter.getYearName(this._dateAdapter.createDate(activeYear - activeYear % yearsPerPage, 0, 1), 'en-US');
                var /** @type {?} */ lastYearInView = this._dateAdapter.getYearName(this._dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % yearsPerPage, 0, 1), 'en-US');
                return firstYearInView + " \u2013 " + lastYearInView;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var /** @type {?} */ change = changes["minDate"] || changes["maxDate"] || changes["dateFilter"];
            if (change && !change.firstChange) {
                var /** @type {?} */ view = this.monthView || this.yearView || this.multiYearView;
                if (view) {
                    view._init();
                }
            }
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            // throw new Error("Method not implemented.");
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.prevMonth = /**
         * @return {?}
         */
        function () {
            this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -1);
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.nextMonth = /**
         * @return {?}
         */
        function () {
            this._activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.prevYear = /**
         * @return {?}
         */
        function () {
            this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -1);
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.nextYear = /**
         * @return {?}
         */
        function () {
            this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, 1);
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.prevYearArray = /**
         * @return {?}
         */
        function () {
            this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerPage);
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype.nextYearArray = /**
         * @return {?}
         */
        function () {
            this._activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerPage);
        };
        /**
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype._init = /**
         * @return {?}
         */
        function () {
            this._activeDate = this.startAt || this._dateAdapter.today();
            this._currentView = this._viewType;
            this._changeDetectorRef.markForCheck();
        };
        /** Handles date selection in the month view. */
        /**
         * Handles date selection in the month view.
         * @param {?} date
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype._dateSelected = /**
         * Handles date selection in the month view.
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (!this._dateAdapter.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        };
        /** Handles year selection in the multiyear view. */
        /**
         * Handles year selection in the multiyear view.
         * @param {?} normalizedYear
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype._yearSelectedInMultiYearView = /**
         * Handles year selection in the multiyear view.
         * @param {?} normalizedYear
         * @return {?}
         */
        function (normalizedYear) {
            this.yearSelected.emit(normalizedYear);
        };
        /** Handles month selection in the year view. */
        /**
         * Handles month selection in the year view.
         * @param {?} normalizedMonth
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype._monthSelectedInYearView = /**
         * Handles month selection in the year view.
         * @param {?} normalizedMonth
         * @return {?}
         */
        function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        /** Handles year/month selection in the multi-year/year views. */
        /**
         * Handles year/month selection in the multi-year/year views.
         * @param {?} date
         * @param {?} view
         * @return {?}
         */
        NtDatePickerCalendarComponent.prototype._goToDateInView = /**
         * Handles year/month selection in the multi-year/year views.
         * @param {?} date
         * @param {?} view
         * @return {?}
         */
        function (date, view) {
            this._activeDate = date;
            this._currentView = view;
        };
        /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        NtDatePickerCalendarComponent.prototype._getValidDateOrNull = /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
        };
        NtDatePickerCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-datepicker-calendar',
                        template: "<div class=\"nt-datepicker-pane\" [ngSwitch]=\"_currentView\"> <table> <thead> <tr *ngSwitchCase=\"'month'\"><ng-container *ngTemplateOutlet=\"monthControl\"></ng-container></tr> <tr *ngSwitchCase=\"'year'\"><ng-container *ngTemplateOutlet=\"yearControl\"></ng-container></tr> <tr *ngSwitchCase=\"'multi-year'\"><ng-container *ngTemplateOutlet=\"multiYearControl\"></ng-container></tr> </thead> </table> <nt-datepicker-month *ngSwitchCase=\"'month'\" [(activeDate)]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (selectedChange)=\"_dateSelected($event)\"> </nt-datepicker-month> <nt-datepicker-year *ngSwitchCase=\"'year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (monthSelected)=\"_monthSelectedInYearView($event)\" (selectedChange)=\"_goToDateInView($event, 'month')\"> </nt-datepicker-year> <nt-datepicker-multi-year *ngSwitchCase=\"'multi-year'\" [activeDate]=\"_activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (yearSelected)=\"_yearSelectedInMultiYearView($event)\" (selectedChange)=\"_goToDateInView($event, 'year')\"> </nt-datepicker-multi-year> </div> <ng-template #monthControl> <th (click)=\"prevYear()\" [class.disabled]=\"\"><span>&laquo;</span></th> <th (click)=\"prevMonth()\" [class.disabled]=\"\"><span>&lsaquo;</span></th> <th colspan=\"3\"> <span (click)=\" _currentView = 'multi-year' \">{{ _yearLabel }}</span> <span (click)=\" _currentView = 'year' \">{{ _monthLabel }}</span> </th> <th (click)=\"nextMonth()\" [class.disabled]=\"\"><span>&rsaquo;</span></th> <th (click)=\"nextYear()\" [class.disabled]=\"\"><span>&raquo;</span></th> </ng-template> <ng-template #yearControl> <th (click)=\"prevYear()\" [class.disabled]=\"\"><span>&laquo;</span></th> <th>&nbsp;</th> <th colspan=\"3\"> <span (click)=\" _currentView = 'multi-year' \">{{ _yearLabel }}</span> </th> <th>&nbsp;</th> <th (click)=\"nextYear()\" [class.disabled]=\"\"><span>&raquo;</span></th> </ng-template> <ng-template #multiYearControl> <th (click)=\"prevYearArray()\"><span>&laquo;</span></th> <th>&nbsp;</th> <th colspan=\"3\">{{_multiYearLabel}}</th> <th>&nbsp;</th> <th (click)=\"nextYearArray()\"><span>&raquo;</span></th> </ng-template> ",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        NtDatePickerCalendarComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef, },
            { type: core$1.DateAdapter, decorators: [{ type: core.Optional },] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.NT_DATE_FORMATS,] },] },
        ]; };
        NtDatePickerCalendarComponent.propDecorators = {
            "startAt": [{ type: core.Input },],
            "selected": [{ type: core.Input },],
            "minDate": [{ type: core.Input },],
            "maxDate": [{ type: core.Input },],
            "dateFilter": [{ type: core.Input },],
            "selectedChange": [{ type: core.Output },],
            "yearSelected": [{ type: core.Output },],
            "monthSelected": [{ type: core.Output },],
            "monthView": [{ type: core.ViewChild, args: [NtDatePickerMonthComponent,] },],
            "yearView": [{ type: core.ViewChild, args: [NtDatePickerYearComponent,] },],
            "multiYearView": [{ type: core.ViewChild, args: [NtDatePickerMultiYearComponent,] },],
        };
        return NtDatePickerCalendarComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @template D
     */
    var NtDatePickerComponent = /** @class */ (function (_super) {
        __extends(NtDatePickerComponent, _super);
        function NtDatePickerComponent(_dateAdapter, _dateFormats, _elementRef, _ngZone, _renderer, ngControl) {
            var _this = _super.call(this) || this;
            _this._dateAdapter = _dateAdapter;
            _this._dateFormats = _dateFormats;
            _this._elementRef = _elementRef;
            _this._ngZone = _ngZone;
            _this._renderer = _renderer;
            _this.ngControl = ngControl;
            _this._disabled = false;
            _this._lastValueValid = false;
            _this._readonly = false;
            _this._required = false;
            _this._focused = false;
            _this.placeholder = '';
            /**
             * Emits when the value changes (either due to user input or programmatic change).
             */
            _this._valueChange = new core.EventEmitter();
            _this._onChange = function () { };
            _this._onTouched = function () { };
            _this.origin = new overlay.OverlayOrigin(_elementRef);
            if (_this.ngControl) {
                _this.ngControl.valueAccessor = _this;
            }
            return _this;
        }
        Object.defineProperty(NtDatePickerComponent.prototype, "empty", {
            get: /**
             * @return {?}
             */
            function () { return !this.value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "focused", {
            get: /**
             * @return {?}
             */
            function () { return this._focused; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = this._dateAdapter.deserialize(value);
                this._lastValueValid = !value || this._dateAdapter.isValid(value);
                value = this._getValidDateOrNull(value);
                var /** @type {?} */ oldDate = this.value;
                this._value = value;
                this.inputElement.nativeElement.value = value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "required", {
            get: /**
             * @return {?}
             */
            function () { return this._required; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._required = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "readonly", {
            get: /**
             * @return {?}
             */
            function () { return this._readonly; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._readonly = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "startAt", {
            get: /**
             * @return {?}
             */
            function () { return this._startAt || this.value; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "minDate", {
            get: /**
             * @return {?}
             */
            function () { return this._minDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtDatePickerComponent.prototype, "maxDate", {
            get: /**
             * @return {?}
             */
            function () { return this._maxDate; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)); },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        NtDatePickerComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NtDatePickerComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NtDatePickerComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouched = fn;
        };
        /**
         * @return {?}
         */
        NtDatePickerComponent.prototype._onInputFocus = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this.overlay.show();
            }
        };
        /**
         * @return {?}
         */
        NtDatePickerComponent.prototype.onOpen = /**
         * @return {?}
         */
        function () {
            this._focused = true;
            this.calendar._init();
        };
        /**
         * @return {?}
         */
        NtDatePickerComponent.prototype.onClose = /**
         * @return {?}
         */
        function () {
            this._focused = false;
            typeof this._onTouched === 'function' && this._onTouched();
        };
        /**
         * @return {?}
         */
        NtDatePickerComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this.inputElement.nativeElement.focus();
            }
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NtDatePickerComponent.prototype.select = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this.value = date;
            this.overlay.hide();
            this._onChange(date);
        };
        /**
         * @return {?}
         */
        NtDatePickerComponent.prototype.clear = /**
         * @return {?}
         */
        function () {
            if (this.value !== null && !this.disabled) {
                this.value = null;
                this._onChange(this.value);
            }
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NtDatePickerComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this._disabled = isDisabled;
        };
        /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        NtDatePickerComponent.prototype._getValidDateOrNull = /**
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
        };
        NtDatePickerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-datepicker',
                        template: "<input #inputElement type=\"text\" (focus)=\"_onInputFocus()\" readonly [placeholder]=\"placeholder\" [disabled]=\"disabled\"> <span class=\"nt-datepicker-caret\" [@fade] *ngIf=\"!value || disabled\"></span> <span class=\"nt-datepicker-clear\" (click)=\"clear()\" [@fade] *ngIf=\"value && !disabled\"></span> <nt-overlay [origin]=\"origin\" trigger=\"click\" position=\"bottomLeft\" arrow (opened)=\"onOpen()\" (closed)=\"onClose()\"> <nt-datepicker-calendar [selected]=\"value\" [dateFilter]=\"dateFilter\" [startAt]=\"startAt\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (selectedChange)=\"select($event)\"> </nt-datepicker-calendar> </nt-overlay> ",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            'class': 'nt-datepicker nt-form-control',
                            '[class.focus]': 'overlay.isOpen'
                        },
                        animations: [
                            animations.trigger('fade', [
                                animations.transition('* => void', fading.fadeOut(.15)),
                                animations.transition('void => *', fading.fadeIn(.15))
                            ])
                        ],
                        providers: [
                            { provide: forms$1.NtFormFieldControl, useExisting: NtDatePickerComponent }
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtDatePickerComponent.ctorParameters = function () { return [
            { type: core$1.DateAdapter, decorators: [{ type: core.Optional },] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core$1.NT_DATE_FORMATS,] },] },
            { type: core.ElementRef, },
            { type: core.NgZone, },
            { type: core.Renderer2, },
            { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional },] },
        ]; };
        NtDatePickerComponent.propDecorators = {
            "placeholder": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "required": [{ type: core.Input },],
            "readonly": [{ type: core.Input },],
            "startAt": [{ type: core.Input },],
            "minDate": [{ type: core.Input },],
            "maxDate": [{ type: core.Input },],
            "dateFilter": [{ type: core.Input },],
            "inputElement": [{ type: core.ViewChild, args: ['inputElement',] },],
            "overlay": [{ type: core.ViewChild, args: [core$1.NtOverlayComponent,] },],
            "calendar": [{ type: core.ViewChild, args: [NtDatePickerCalendarComponent,] },],
        };
        return NtDatePickerComponent;
    }(forms$1.NtFormFieldControl));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtDatePickerModule = /** @class */ (function () {
        function NtDatePickerModule() {
        }
        NtDatePickerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, core$1.NtOverlayModule, core$1.NtNativeDateModule],
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
        NtDatePickerModule.ctorParameters = function () { return []; };
        return NtDatePickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtDatePickerModule = NtDatePickerModule;
    exports.NtDatePickerComponent = NtDatePickerComponent;
    exports.createMissingDateImplError = createMissingDateImplError;
    exports.NtDatePickerCell = NtDatePickerCell;
    exports.NtDatePickerCalendarComponent = NtDatePickerCalendarComponent;
    exports.NtDatePickerMonthComponent = NtDatePickerMonthComponent;
    exports.yearsPerPage = yearsPerPage;
    exports.yearsPerRow = yearsPerRow;
    exports.NtDatePickerMultiYearComponent = NtDatePickerMultiYearComponent;
    exports.NtDatePickerYearComponent = NtDatePickerYearComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=datepicker.umd.js.map
