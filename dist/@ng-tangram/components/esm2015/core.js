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
const /** @type {?} */ NT_DATE_LOCALE = new InjectionToken('nt-date-locale');
/**
 * Provider for NT_DATE_LOCALE injection token.
 */
const /** @type {?} */ NT_DATE_LOCALE_PROVIDER = { provide: NT_DATE_LOCALE, useExisting: LOCALE_ID };
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
class DateAdapter {
    constructor() {
        this._localeChanges = new Subject();
    }
    /**
     * A stream that emits when the locale changes.
     * @return {?}
     */
    get localeChanges() { return this._localeChanges; }
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
    deserialize(value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second) {
        if (first && second) {
            let /** @type {?} */ firstValid = this.isValid(first);
            let /** @type {?} */ secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ NT_DATE_FORMATS = new InjectionToken('nt-date-formats');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Whether the browser supports the Intl API.
 */
const /** @type {?} */ SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * The default month names to use if Intl API is not available.
 */
const /** @type {?} */ DEFAULT_MONTH_NAMES = {
    'long': [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
        '十月', '十一月', '十二月'
    ],
    'short': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    'narrow': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
};
const ɵ0 = i => String(i + 1);
/**
 * The default date names to use if Intl API is not available.
 */
const /** @type {?} */ DEFAULT_DATE_NAMES = range(31, ɵ0);
/**
 * The default day of the week names to use if Intl API is not available.
 */
const /** @type {?} */ DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    'short': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'narrow': ['日', '一', '二', '三', '四', '五', '六']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
const /** @type {?} */ ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    const /** @type {?} */ valuesArray = Array(length);
    for (let /** @type {?} */ i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
class NativeDateAdapter extends DateAdapter {
    /**
     * @param {?} ntDateLocale
     * @param {?} platform
     */
    constructor(ntDateLocale, platform) {
        super();
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
        this.useUtcForDisplay = true;
        super.setLocale(ntDateLocale);
        // IE does its own time zone correction, so we disable this on IE.
        this.useUtcForDisplay = !platform.TRIDENT;
        this._clampDate = platform.TRIDENT || platform.EDGE;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return date.getDay();
    }
    /**
     * @param {?} style
     * @param {?=} locale
     * @return {?}
     */
    getMonthNames(style, locale = this.locale) {
        if (SUPPORTS_INTL_API) {
            const /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, { month: style, timeZone: 'utc' });
            return range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    /**
     * 因为暂时不清楚在中文语言环境下设定纯数字日期名称，故先强制使用 英文日期
     * @param {?=} locale
     * @return {?}
     */
    getDateNames(locale = 'en-US') {
        if (SUPPORTS_INTL_API) {
            const /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: 'utc' });
            return range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DATE_NAMES;
    }
    /**
     * @param {?} style
     * @param {?=} locale
     * @return {?}
     */
    getDayOfWeekNames(style, locale = this.locale) {
        if (SUPPORTS_INTL_API) {
            const /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'utc' });
            return range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    /**
     * @param {?} date
     * @param {?=} locale
     * @return {?}
     */
    getYearName(date, locale = this.locale) {
        if (SUPPORTS_INTL_API) {
            const /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'utc' });
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    createDate(year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        let /** @type {?} */ result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @return {?}
     */
    today() {
        return new Date();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @param {?=} locale
     * @return {?}
     */
    format(date, displayFormat, locale = this.locale) {
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
            displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
            const /** @type {?} */ dtf = new Intl.DateTimeFormat(locale, displayFormat);
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        let /** @type {?} */ newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                let /** @type {?} */ date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return super.deserialize(value);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return !isNaN(date.getTime());
    }
    /**
     * @return {?}
     */
    invalid() {
        return new Date(NaN);
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    _createDateWithOverflow(year, month, date) {
        const /** @type {?} */ result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    _stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
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
    _format(dtf, date) {
        const /** @type {?} */ d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    }
}
NativeDateAdapter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NativeDateAdapter.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_DATE_LOCALE,] },] },
    { type: Platform, },
];

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
const /** @type {?} */ NT_NATIVE_DATE_FORMATS = {
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
class NativeDateModule {
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
NativeDateModule.ctorParameters = () => [];
const ɵ0$1 = NT_NATIVE_DATE_FORMATS;
class NtNativeDateModule {
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
NtNativeDateModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtOptionSelectionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
const /** @type {?} */ NT_OPTION_PARENT_COMPONENT = new InjectionToken('nt-option-parent-component');
class NtOptionComponent {
    /**
     * @param {?} _element
     * @param {?} _changeDetectorRef
     * @param {?} _parent
     */
    constructor(_element, _changeDetectorRef, _parent) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this._selected = false;
        this._disabled = false;
        this._mostRecentViewValue = '';
        this.stateChanges = new Subject();
        this.selectionChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get label() { return (this._element.nativeElement.textContent || '').trim(); }
    /**
     * @return {?}
     */
    get multiple() { return this._parent && this._parent.multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this._value = value; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
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
    get selected() { return this._selected; }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._selected) {
            const /** @type {?} */ viewValue = this.label;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    }
    /**
     * @return {?}
     */
    focus() {
        const /** @type {?} */ element = this._element.nativeElement;
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * @return {?}
     */
    select() {
        this._selected = true;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    }
    /**
     * @return {?}
     */
    deselect() {
        this._selected = false;
        this._changeDetectorRef.markForCheck();
        this._emitSelectionChangeEvent();
    }
    /**
     * @return {?}
     */
    selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /**
     * @return {?}
     */
    getOffsetY() {
        return this._element.nativeElement.offsetTop;
    }
    /**
     * @param {?=} isUserInput
     * @return {?}
     */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.selectionChange.emit(new NtOptionSelectionChange(this, isUserInput));
    }
}
NtOptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-option',
                template: `<ng-content></ng-content>`,
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
NtOptionComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NT_OPTION_PARENT_COMPONENT,] },] },
];
NtOptionComponent.propDecorators = {
    "value": [{ type: Input },],
    "disabled": [{ type: Input },],
    "selectionChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtOptionModule {
}
NtOptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtOptionComponent],
                declarations: [NtOptionComponent]
            },] },
];
/** @nocollapse */
NtOptionModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const NtOverlayOrientation = {
    Vertical: 'vertical',
    Horizontal: 'horizontal',
};
const /** @type {?} */ OVERLAY_POSITIONS = {
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
    return /** @type {?} */ ({ originX, originY, overlayX, overlayY });
}
/**
 * 获取定位名称拼接字符串
 * @param {?} pair 定位类型。
 * @return {?}
 */
function getPositionClassName(pair) {
    return `${pair.originX}-${pair.originY}-${pair.overlayX}-${pair.overlayY}`;
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
class NtOverlayComponent {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
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
            .filter(_ => this._isMouseIn === false)
            .subscribe(_ => this.hide());
        this._positionChange
            .filter(position => position !== this._paddingClass)
            .subscribe((position) => {
            const /** @type {?} */ pane = this.cdkConnectedOverlay.overlayRef.overlayElement.querySelector('.nt-overlay-container');
            this._paddingClass && this._renderer.removeClass(pane, this._paddingClass);
            this._paddingClass = position;
            this._renderer.addClass(pane, this._paddingClass);
        });
    }
    /**
     * @return {?}
     */
    get isOpen() { return this._isOpen; }
    /**
     * @return {?}
     */
    get isMouseIn() { return this._isMouseIn; }
    /**
     * @param {?} value
     * @return {?}
     */
    set origin(value) { this._origin = value; }
    /**
     * @return {?}
     */
    get origin() { return this._origin; }
    /**
     * @param {?} value
     * @return {?}
     */
    set position(value) { this._position = value; this._setPosition(); }
    /**
     * @return {?}
     */
    get positions() { return this._positionPairs; }
    /**
     * @return {?}
     */
    get paddingClass() { return this._paddingClass; }
    /**
     * @param {?} value
     * @return {?}
     */
    set fixed(value) { this._fixed = coerceBooleanProperty(value); this._setPosition(); }
    /**
     * @return {?}
     */
    get fixed() { return this._fixed; }
    /**
     * @param {?} value
     * @return {?}
     */
    set arrow(value) { this._arrow = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get arrow() { return this._arrow; }
    /**
     * @param {?} value
     * @return {?}
     */
    set noSpacing(value) { this._noSpacing = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get noSpacing() { return this._noSpacing; }
    /**
     * @param {?} value
     * @return {?}
     */
    set trigger(value) { this._trigger = value; }
    /**
     * @return {?}
     */
    get trigger() { return this._trigger; }
    /**
     * @param {?} value
     * @return {?}
     */
    set overlayClass(value) { this._overlayClass = value; }
    /**
     * @return {?}
     */
    get overlayClass() { return this._overlayClass; }
    /**
     * @return {?}
     */
    _setPosition() {
        this._positionPairs = this.fixed ?
            OVERLAY_POSITIONS[this._position].slice(0, 1) :
            OVERLAY_POSITIONS[this._position];
        this._paddingClass = getPositionClassName(this._positionPairs[0]);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getPosition(value) {
        return this.fixed ? OVERLAY_POSITIONS[value].slice(0, 1) : OVERLAY_POSITIONS[value];
    }
    /**
     * @return {?}
     */
    show() {
        this._isOpen = true;
        this.opened.next();
    }
    /**
     * @return {?}
     */
    hide() {
        this._isOpen = false;
        this.closed.next();
    }
    /**
     * @return {?}
     */
    click() {
        if (this.trigger === 'click') {
            this.isOpen ? this.hide() : this.show();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOverlayPositionChange(event) {
        this._positionChange.next(getPositionClassName(event.connectionPair));
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        if (this.trigger === 'hover') {
            this._isMouseIn = true;
            this.show();
        }
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        if (this.trigger === 'hover') {
            this._closeEvent.next(this._isMouseIn = false);
        }
    }
}
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
NtOverlayComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtOverlayModule {
}
NtOverlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, OverlayModule],
                exports: [NtOverlayComponent],
                declarations: [NtOverlayComponent],
            },] },
];
/** @nocollapse */
NtOverlayModule.ctorParameters = () => [];

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
