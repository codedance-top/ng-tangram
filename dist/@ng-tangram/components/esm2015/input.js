import { Directive, Input, ElementRef, Optional, Self, NgModule } from '@angular/core';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtInputDirective extends NtFormFieldControl {
    /**
     * @param {?} ngControl
     * @param {?} _platform
     * @param {?} _elementRef
     */
    constructor(ngControl, _platform, _elementRef) {
        super();
        this.ngControl = ngControl;
        this._platform = _platform;
        this._elementRef = _elementRef;
        this._disabled = false;
        this._type = 'text';
        this._readonly = false;
        this._required = false;
        this._focused = false;
        this.placeholder = '';
    }
    /**
     * @return {?}
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this._focused) {
            this._focused = false;
        }
    }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Input type of the element.
     * @return {?}
     */
    get type() { return this._type; }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value || 'text';
        if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    /**
     * @return {?}
     */
    get value() { return this._elementRef.nativeElement.value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this.value) {
            this._elementRef.nativeElement.value = value;
        }
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get empty() { return !this._elementRef.nativeElement.value && !this._isBadInput(); }
    /**
     * @return {?}
     */
    focus() { this._elementRef.nativeElement.focus(); }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    _focusChanged(isFocused) {
        if (isFocused !== this._focused && !this.readonly) {
            this._focused = isFocused;
        }
    }
    /**
     * @return {?}
     */
    _isBadInput() {
        const /** @type {?} */ validity = (/** @type {?} */ (this._elementRef.nativeElement)).validity;
        return validity && validity.badInput;
    }
    /**
     * Determines if the component host is a textarea. If not recognizable it returns false.
     * @return {?}
     */
    _isTextarea() {
        const /** @type {?} */ nativeElement = this._elementRef.nativeElement;
        const /** @type {?} */ nodeName = this._platform.isBrowser ? nativeElement.nodeName : nativeElement.name;
        return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
    }
}
NtInputDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[ntInput], textarea[ntInput]',
                host: {
                    '(blur)': '_focusChanged(false)',
                    '(focus)': '_focusChanged(true)',
                },
                providers: [
                    { provide: NtFormFieldControl, useExisting: NtInputDirective }
                ]
            },] },
];
/** @nocollapse */
NtInputDirective.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self },] },
    { type: Platform, },
    { type: ElementRef, },
];
NtInputDirective.propDecorators = {
    "placeholder": [{ type: Input },],
    "disabled": [{ type: Input },],
    "required": [{ type: Input },],
    "type": [{ type: Input },],
    "value": [{ type: Input },],
    "readonly": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtInputModule {
}
NtInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtInputDirective],
                declarations: [NtInputDirective]
            },] },
];
/** @nocollapse */
NtInputModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtInputModule, NtInputDirective };
//# sourceMappingURL=input.js.map
