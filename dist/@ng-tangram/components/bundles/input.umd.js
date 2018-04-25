(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/platform'), require('@ng-tangram/components/forms'), require('@angular/cdk/coercion'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/platform', '@ng-tangram/components/forms', '@angular/cdk/coercion', '@angular/forms', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.input = {}),global.ng.core,global.ng.cdk.platform,global.nt.components.forms,global.ng.cdk.coercion,global.ng.forms,global.ng.common));
}(this, (function (exports,core,platform,forms,coercion,forms$1,common) { 'use strict';

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
    var NtInputDirective = /** @class */ (function (_super) {
        __extends(NtInputDirective, _super);
        function NtInputDirective(ngControl, _platform, _elementRef) {
            var _this = _super.call(this) || this;
            _this.ngControl = ngControl;
            _this._platform = _platform;
            _this._elementRef = _elementRef;
            _this._disabled = false;
            _this._type = 'text';
            _this._readonly = false;
            _this._required = false;
            _this._focused = false;
            _this.placeholder = '';
            return _this;
        }
        Object.defineProperty(NtInputDirective.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.ngControl && this.ngControl.disabled !== null) {
                    return this.ngControl.disabled;
                }
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
                if (this._focused) {
                    this._focused = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtInputDirective.prototype, "required", {
            get: /**
             * @return {?}
             */
            function () { return this._required; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._required = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtInputDirective.prototype, "type", {
            get: /**
             * Input type of the element.
             * @return {?}
             */
            function () { return this._type; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._type = value || 'text';
                if (!this._isTextarea() && platform.getSupportedInputTypes().has(this._type)) {
                    this._elementRef.nativeElement.type = this._type;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtInputDirective.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._elementRef.nativeElement.value; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this.value) {
                    this._elementRef.nativeElement.value = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtInputDirective.prototype, "readonly", {
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
        Object.defineProperty(NtInputDirective.prototype, "empty", {
            get: /**
             * @return {?}
             */
            function () { return !this._elementRef.nativeElement.value && !this._isBadInput(); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtInputDirective.prototype.focus = /**
         * @return {?}
         */
        function () { this._elementRef.nativeElement.focus(); };
        /**
         * @param {?} isFocused
         * @return {?}
         */
        NtInputDirective.prototype._focusChanged = /**
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            if (isFocused !== this._focused && !this.readonly) {
                this._focused = isFocused;
            }
        };
        /**
         * @return {?}
         */
        NtInputDirective.prototype._isBadInput = /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ validity = (/** @type {?} */ (this._elementRef.nativeElement)).validity;
            return validity && validity.badInput;
        };
        /**
         * Determines if the component host is a textarea. If not recognizable it returns false.
         * @return {?}
         */
        NtInputDirective.prototype._isTextarea = /**
         * Determines if the component host is a textarea. If not recognizable it returns false.
         * @return {?}
         */
        function () {
            var /** @type {?} */ nativeElement = this._elementRef.nativeElement;
            var /** @type {?} */ nodeName = this._platform.isBrowser ? nativeElement.nodeName : nativeElement.name;
            return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
        };
        NtInputDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[ntInput], textarea[ntInput]',
                        host: {
                            '(blur)': '_focusChanged(false)',
                            '(focus)': '_focusChanged(true)',
                        },
                        providers: [
                            { provide: forms.NtFormFieldControl, useExisting: NtInputDirective }
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtInputDirective.ctorParameters = function () { return [
            { type: forms$1.NgControl, decorators: [{ type: core.Optional }, { type: core.Self },] },
            { type: platform.Platform, },
            { type: core.ElementRef, },
        ]; };
        NtInputDirective.propDecorators = {
            "placeholder": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "required": [{ type: core.Input },],
            "type": [{ type: core.Input },],
            "value": [{ type: core.Input },],
            "readonly": [{ type: core.Input },],
        };
        return NtInputDirective;
    }(forms.NtFormFieldControl));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtInputModule = /** @class */ (function () {
        function NtInputModule() {
        }
        NtInputModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [NtInputDirective],
                        declarations: [NtInputDirective]
                    },] },
        ];
        /** @nocollapse */
        NtInputModule.ctorParameters = function () { return []; };
        return NtInputModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtInputModule = NtInputModule;
    exports.NtInputDirective = NtInputDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=input.umd.js.map
