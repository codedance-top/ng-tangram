import { InjectionToken, LOCALE_ID, Inject, Injectable, Optional, NgModule, Component, ChangeDetectorRef, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { trigger, transition } from '@angular/animations';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * InjectionToken for datepicker that can be used to override default locale code.
 */
var /** @type {?} */ NT_DATE_LOCALE = new InjectionToken('nt-date-locale');
/**
 * Provider for NT_DATE_LOCALE injection token.
 */
var /** @type {?} */ NT_DATE_LOCALE_PROVIDER = { provide: NT_DATE_LOCALE, useExisting: LOCALE_ID };
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
var  /**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
DateAdapter = /** @class */ (function () {
    function DateAdapter() {
        this._localeChanges = new Subject();
    }
    Object.defineProperty(DateAdapter.prototype, "localeChanges", {
        /** A stream that emits when the locale changes. */
        get: /**
         * A stream that emits when the locale changes.
         * @return {?}
         */
        function () { return this._localeChanges; },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<nt-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<nt-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value The value to be deserialized into a date object.
     * @return {?} The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    DateAdapter.prototype.deserialize = /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<nt-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value The value to be deserialized into a date object.
     * @return {?} The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    function (value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    DateAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
        this._localeChanges.next();
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateAdapter.prototype.sameDate = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first, second) {
        if (first && second) {
            var /** @type {?} */ firstValid = this.isValid(first);
            var /** @type {?} */ secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ NT_DATE_FORMATS = new InjectionToken('nt-date-formats');

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

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Whether the browser supports the Intl API.
 */
var /** @type {?} */ SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * The default month names to use if Intl API is not available.
 */
var /** @type {?} */ DEFAULT_MONTH_NAMES = {
    'long': [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
        '十月', '十一月', '十二月'
    ],
    'short': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'narrow': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
};
var ɵ0 = function (i) { return String(i + 1); };
/**
 * The default date names to use if Intl API is not available.
 */
var /** @type {?} */ DEFAULT_DATE_NAMES = range(31, ɵ0);
/**
 * The default day of the week names to use if Intl API is not available.
 */
var /** @type {?} */ DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    'short': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'narrow': ['日', '一', '二', '三', '四', '五', '六']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
var /** @type {?} */ ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    var /** @type {?} */ valuesArray = Array(length);
    for (var /** @type {?} */ i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
var NativeDateAdapter = /** @class */ (function (_super) {
    __extends(NativeDateAdapter, _super);
    function NativeDateAdapter(ntDateLocale, platform) {
        var _this = _super.call(this) || this;
        /**
         * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
         * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
         * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
         * will produce `'8/13/1800'`.
         *
         * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
         * getting the string representation of a Date object from it's utc representation. We're keeping
         * it here for sometime, just for precaution, in case we decide to revert some of these changes
         * though.
         */
        _this.useUtcForDisplay = true;
        _super.prototype.setLocale.call(_this, ntDateLocale);
        // IE does its own time zone correction, so we disable this on IE.
        // IE does its own time zone correction, so we disable this on IE.
        _this.useUtcForDisplay = !platform.TRIDENT;
        _this._clampDate = platform.TRIDENT || platform.EDGE;
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} style
     * @param {?=} locale
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @param {?=} locale
     * @return {?}
     */
    function (style, locale) {
        var _this = this;
        if (locale === void 0) { locale = this.locale; }
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_1 = new Intl.DateTimeFormat(locale, { month: style, timeZone: 'utc' });
            return range(12, function (i) {
                return _this._stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1)));
            });
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    /** 因为暂时不清楚在中文语言环境下设定纯数字日期名称，故先强制使用 英文日期  */
    /**
     * 因为暂时不清楚在中文语言环境下设定纯数字日期名称，故先强制使用 英文日期
     * @param {?=} locale
     * @return {?}
     */
    NativeDateAdapter.prototype.getDateNames = /**
     * 因为暂时不清楚在中文语言环境下设定纯数字日期名称，故先强制使用 英文日期
     * @param {?=} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en-US'; }
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_2 = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: 'utc' });
            return range(31, function (i) {
                return _this._stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1)));
            });
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @param {?} style
     * @param {?=} locale
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @param {?=} locale
     * @return {?}
     */
    function (style, locale) {
        var _this = this;
        if (locale === void 0) { locale = this.locale; }
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf_3 = new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'utc' });
            return range(7, function (i) {
                return _this._stripDirectionalityCharacters(_this._format(dtf_3, new Date(2017, 0, i + 1)));
            });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    /**
     * @param {?} date
     * @param {?=} locale
     * @return {?}
     */
    NativeDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @param {?=} locale
     * @return {?}
     */
    function (date, locale) {
        if (locale === void 0) { locale = this.locale; }
        if (SUPPORTS_INTL_API) {
            var /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'utc' });
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        var /** @type {?} */ result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NativeDateAdapter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @param {?=} locale
     * @return {?}
     */
    NativeDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @param {?=} locale
     * @return {?}
     */
    function (date, displayFormat, locale) {
        if (locale === void 0) { locale = this.locale; }
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            // On IE and Edge the i18n API will throw a hard error that can crash the entire app
            // if we attempt to format a date whose year is less than 1 or greater than 9999.
            if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = __assign({}, displayFormat, { timeZone: 'utc' });
            var /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, displayFormat);
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        var /** @type {?} */ newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    NativeDateAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                var /** @type {?} */ date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return _super.prototype.deserialize.call(this, value);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NativeDateAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj instanceof Date;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return !isNaN(date.getTime());
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return new Date(NaN);
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype._createDateWithOverflow = /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        var /** @type {?} */ result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    NativeDateAdapter.prototype._2digit = /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    NativeDateAdapter.prototype._stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    function (str) {
        return str.replace(/[\u200e\u200f]/g, '');
    };
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param {?} dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param {?} date Date from which we want to get the string representation according to dtf
     * @return {?} A Date object with its UTC representation based on the passed in date info
     */
    NativeDateAdapter.prototype._format = /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param {?} dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param {?} date Date from which we want to get the string representation according to dtf
     * @return {?} A Date object with its UTC representation based on the passed in date info
     */
    function (dtf, date) {
        var /** @type {?} */ d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    };
    NativeDateAdapter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NativeDateAdapter.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_DATE_LOCALE,] },] },
        { type: Platform, },
    ]; };
    return NativeDateAdapter;
}(DateAdapter));

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
var /** @type {?} */ NT_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { month: 'short' }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NativeDateModule = /** @class */ (function () {
    function NativeDateModule() {
    }
    NativeDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    providers: [
                        { provide: DateAdapter, useClass: NativeDateAdapter },
                        NT_DATE_LOCALE_PROVIDER
                    ],
                },] },
    ];
    /** @nocollapse */
    NativeDateModule.ctorParameters = function () { return []; };
    return NativeDateModule;
}());
var ɵ0$1 = NT_NATIVE_DATE_FORMATS;
var NtNativeDateModule = /** @class */ (function () {
    function NtNativeDateModule() {
    }
    NtNativeDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateModule],
                    providers: [
                        { provide: NT_DATE_FORMATS, useValue: ɵ0$1 }
                    ],
                },] },
    ];
    /** @nocollapse */
    NtNativeDateModule.ctorParameters = function () { return []; };
    return NtNativeDateModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtOptionSelectionChange = /** @class */ (function () {
    function NtOptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return NtOptionSelectionChange;
}());
var /** @type {?} */ NT_OPTION_PARENT_COMPONENT = new InjectionToken('nt-option-parent-component');
var NtOptionComponent = /** @class */ (function () {
    function NtOptionComponent(_element, _changeDetectorRef, _parent) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this._selected = false;
        this._disabled = false;
        this._mostRecentViewValue = '';
        this.stateChanges = new Subject();
        this.selectionChange = new EventEmitter();
    }
    Object.defineProperty(NtOptionComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () { return (this._element.nativeElement.textContent || '').trim(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOptionComponent.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () { return this._parent && this._parent.multiple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOptionComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOptionComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOptionComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NtOptionComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this._selected) {
            var /** @type {?} */ viewValue = this.label;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    };
    /**
     * @return {?}
     */
    NtOptionComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this._element.nativeElement;
        if (typeof element.focus === 'function') {
            element.focus();
        }
    };
    /**
     * @return {?}
     */
    NtOptionComponent.prototype.select = /**
     * @return {?}
     */
    function () {
        this._selected = true;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    };
    /**
     * @return {?}
     */
    NtOptionComponent.prototype.deselect = /**
     * @return {?}
     */
    function () {
        this._selected = false;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    };
    /**
     * @return {?}
     */
    NtOptionComponent.prototype.selectViaInteraction = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    };
    /**
     * @return {?}
     */
    NtOptionComponent.prototype.getOffsetY = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement.offsetTop;
    };
    /**
     * @param {?=} isUserInput
     * @return {?}
     */
    NtOptionComponent.prototype._emitSelectionChangeEvent = /**
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.selectionChange.emit(new NtOptionSelectionChange(this, isUserInput));
    };
    NtOptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-option',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'nt-option',
                        '[class.selected]': 'selected',
                        '[class.disabled]': 'disabled',
                        '(click)': 'selectViaInteraction()'
                    }
                },] },
    ];
    /** @nocollapse */
    NtOptionComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_OPTION_PARENT_COMPONENT,] },] },
    ]; };
    NtOptionComponent.propDecorators = {
        "value": [{ type: Input },],
        "disabled": [{ type: Input },],
        "selectionChange": [{ type: Output },],
    };
    return NtOptionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtOptionModule = /** @class */ (function () {
    function NtOptionModule() {
    }
    NtOptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [NtOptionComponent],
                    declarations: [NtOptionComponent]
                },] },
    ];
    /** @nocollapse */
    NtOptionModule.ctorParameters = function () { return []; };
    return NtOptionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var NtOverlayOrientation = {
    Vertical: 'vertical',
    Horizontal: 'horizontal',
};
var /** @type {?} */ OVERLAY_POSITIONS = {
    bottom: [
        getConnectionPositionPair('center', 'bottom', 'center', 'top'),
        getConnectionPositionPair('center', 'top', 'center', 'bottom')
    ],
    bottomLeft: [
        getConnectionPositionPair('start', 'bottom', 'start', 'top'),
        getConnectionPositionPair('start', 'top', 'start', 'bottom')
    ],
    bottomRight: [
        getConnectionPositionPair('end', 'bottom', 'end', 'top'),
        getConnectionPositionPair('end', 'top', 'end', 'bottom')
    ],
    top: [
        getConnectionPositionPair('center', 'top', 'center', 'bottom'),
        getConnectionPositionPair('center', 'bottom', 'center', 'top')
    ],
    topLeft: [
        getConnectionPositionPair('start', 'top', 'start', 'bottom'),
        getConnectionPositionPair('start', 'bottom', 'start', 'top')
    ],
    topRight: [
        getConnectionPositionPair('end', 'top', 'end', 'bottom'),
        getConnectionPositionPair('end', 'bottom', 'end', 'top')
    ],
    left: [
        getConnectionPositionPair('start', 'center', 'end', 'center'),
        getConnectionPositionPair('end', 'center', 'start', 'center')
    ],
    leftTop: [
        getConnectionPositionPair('start', 'top', 'end', 'top'),
        getConnectionPositionPair('end', 'top', 'start', 'top')
    ],
    leftBottom: [
        getConnectionPositionPair('start', 'bottom', 'end', 'bottom'),
        getConnectionPositionPair('end', 'bottom', 'start', 'bottom')
    ],
    right: [
        getConnectionPositionPair('end', 'center', 'start', 'center'),
        getConnectionPositionPair('start', 'center', 'end', 'center')
    ],
    rightTop: [
        getConnectionPositionPair('end', 'top', 'start', 'top'),
        getConnectionPositionPair('start', 'top', 'end', 'top')
    ],
    rightBottom: [
        getConnectionPositionPair('end', 'bottom', 'start', 'bottom'),
        getConnectionPositionPair('start', 'bottom', 'end', 'bottom')
    ]
};
/**
 * 定义并返回一个 overlay 窗体定位
 * @param {?} originX 主体的中心x轴，窗体会相对于主体的中心点定位。
 * @param {?} originY 主体的中心y轴，窗体会相对于主体的中心点定位。
 * @param {?} overlayX 窗体的中心x轴。
 * @param {?} overlayY 窗体的中心y轴。
 * @return {?}
 */
function getConnectionPositionPair(originX, originY, overlayX, overlayY) {
    return /** @type {?} */ ({ originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY });
}
/**
 * 获取定位名称拼接字符串
 * @param {?} pair 定位类型。
 * @return {?}
 */
function getPositionClassName(pair) {
    return pair.originX + "-" + pair.originY + "-" + pair.overlayX + "-" + pair.overlayY;
}
/**
 * @param {?} position
 * @return {?}
 */
function getPositionOrientation(position) {
    return Object.keys(OVERLAY_POSITIONS).indexOf(position) > 5
        ? NtOverlayOrientation.Horizontal
        : NtOverlayOrientation.Vertical;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtOverlayComponent = /** @class */ (function () {
    function NtOverlayComponent(_renderer, _elementRef) {
        var _this = this;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._isOpen = false;
        this._isMouseIn = false;
        this._position = 'bottomLeft';
        this._positionPairs = OVERLAY_POSITIONS[this._position];
        this._paddingClass = getPositionClassName(this._positionPairs[0]);
        this._arrow = false;
        this._noSpacing = false;
        this._trigger = '';
        this._overlayClass = '';
        this._fixed = false;
        this._closeEvent = new EventEmitter();
        this._positionChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.positionChange = new EventEmitter();
        this._closeEvent
            .debounceTime(100)
            .filter(function (_) { return _this._isMouseIn === false; })
            .subscribe(function (_) { return _this.hide(); });
        this._positionChange
            .filter(function (position) { return position !== _this._paddingClass; })
            .subscribe(function (position) {
            var /** @type {?} */ pane = _this.cdkConnectedOverlay.overlayRef.overlayElement.querySelector('.nt-overlay-container');
            _this._paddingClass && _this._renderer.removeClass(pane, _this._paddingClass);
            _this._paddingClass = position;
            _this._renderer.addClass(pane, _this._paddingClass);
        });
    }
    Object.defineProperty(NtOverlayComponent.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () { return this._isOpen; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "isMouseIn", {
        get: /**
         * @return {?}
         */
        function () { return this._isMouseIn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "origin", {
        get: /**
         * @return {?}
         */
        function () { return this._origin; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._origin = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "position", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._position = value; this._setPosition(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "positions", {
        get: /**
         * @return {?}
         */
        function () { return this._positionPairs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "paddingClass", {
        get: /**
         * @return {?}
         */
        function () { return this._paddingClass; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "fixed", {
        get: /**
         * @return {?}
         */
        function () { return this._fixed; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixed = coerceBooleanProperty(value); this._setPosition(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "arrow", {
        get: /**
         * @return {?}
         */
        function () { return this._arrow; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._arrow = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "noSpacing", {
        get: /**
         * @return {?}
         */
        function () { return this._noSpacing; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._noSpacing = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "trigger", {
        get: /**
         * @return {?}
         */
        function () { return this._trigger; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._trigger = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtOverlayComponent.prototype, "overlayClass", {
        get: /**
         * @return {?}
         */
        function () { return this._overlayClass; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._overlayClass = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NtOverlayComponent.prototype._setPosition = /**
     * @return {?}
     */
    function () {
        this._positionPairs = this.fixed ?
            OVERLAY_POSITIONS[this._position].slice(0, 1) :
            OVERLAY_POSITIONS[this._position];
        this._paddingClass = getPositionClassName(this._positionPairs[0]);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NtOverlayComponent.prototype.getPosition = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.fixed ? OVERLAY_POSITIONS[value].slice(0, 1) : OVERLAY_POSITIONS[value];
    };
    /**
     * @return {?}
     */
    NtOverlayComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this._isOpen = true;
        this.opened.next();
    };
    /**
     * @return {?}
     */
    NtOverlayComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this._isOpen = false;
        this.closed.next();
    };
    /**
     * @return {?}
     */
    NtOverlayComponent.prototype.click = /**
     * @return {?}
     */
    function () {
        if (this.trigger === 'click') {
            this.isOpen ? this.hide() : this.show();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NtOverlayComponent.prototype.onOverlayPositionChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._positionChange.next(getPositionClassName(event.connectionPair));
    };
    /**
     * @return {?}
     */
    NtOverlayComponent.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        if (this.trigger === 'hover') {
            this._isMouseIn = true;
            this.show();
        }
    };
    /**
     * @return {?}
     */
    NtOverlayComponent.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        if (this.trigger === 'hover') {
            this._closeEvent.next(this._isMouseIn = false);
        }
    };
    NtOverlayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-overlay, [nt-overlay]',
                    template: "<ng-template cdk-connected-overlay [cdkConnectedOverlayOpen]=\"isOpen\" [cdkConnectedOverlayHasBackdrop]=\"trigger === 'click'\" [cdkConnectedOverlayPositions]=\"positions\" [cdkConnectedOverlayOrigin]=\"origin\" (positionChange)=\"onOverlayPositionChange($event)\" (backdropClick)=\"hide()\"> <div class=\"nt-overlay-container {{paddingClass}} {{overlayClass}}\" (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\" [class.no-spacing]=\"noSpacing\" [@fade]> <div class=\"nt-overlay-shadow\"></div> <div class=\"nt-overlay-arrow\" *ngIf=\"arrow\"></div> <div class=\"nt-overlay-pane\"> <ng-content></ng-content> </div> </div> </ng-template> ",
                    animations: [
                        trigger('fade', [
                            transition('void => *', fadeIn(.15)),
                            transition('* => void', fadeOut(.15))
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NtOverlayComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NtOverlayComponent.propDecorators = {
        "origin": [{ type: Input },],
        "position": [{ type: Input },],
        "fixed": [{ type: Input },],
        "arrow": [{ type: Input },],
        "noSpacing": [{ type: Input },],
        "trigger": [{ type: Input },],
        "overlayClass": [{ type: Input },],
        "cdkConnectedOverlay": [{ type: ViewChild, args: [CdkConnectedOverlay,] },],
        "opened": [{ type: Output },],
        "closed": [{ type: Output },],
        "positionChange": [{ type: Output },],
    };
    return NtOverlayComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtOverlayModule = /** @class */ (function () {
    function NtOverlayModule() {
    }
    NtOverlayModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, OverlayModule],
                    exports: [NtOverlayComponent],
                    declarations: [NtOverlayComponent],
                },] },
    ];
    /** @nocollapse */
    NtOverlayModule.ctorParameters = function () { return []; };
    return NtOverlayModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NT_DATE_LOCALE, NT_DATE_LOCALE_PROVIDER, DateAdapter, NT_DATE_FORMATS, NativeDateAdapter, NT_NATIVE_DATE_FORMATS, NativeDateModule, NtNativeDateModule, NtOptionModule, NtOptionSelectionChange, NT_OPTION_PARENT_COMPONENT, NtOptionComponent, NtOverlayModule, NtOverlayComponent, NtOverlayOrientation, OVERLAY_POSITIONS, getConnectionPositionPair, getPositionClassName, getPositionOrientation };
//# sourceMappingURL=core.js.map
