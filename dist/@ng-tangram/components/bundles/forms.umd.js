(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('@ng-tangram/animate/fading'), require('rxjs/add/observable/of'), require('rxjs/add/operator/distinctUntilChanged'), require('rxjs/Observable'), require('rxjs/observable/defer'), require('rxjs/operators'), require('rxjs/Subject'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/animations', '@angular/cdk/coercion', '@angular/core', '@angular/forms', '@ng-tangram/animate/fading', 'rxjs/add/observable/of', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/Observable', 'rxjs/observable/defer', 'rxjs/operators', 'rxjs/Subject', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.forms = {}),global.ng.animations,global.ng.cdk.coercion,global.ng.core,global.ng.forms,global.nt.animate.fading,null,null,global.Rx.Observable,global.Rx.observable.defer,global.Rx.operators,global.Rx.Subject,global.ng.common));
}(this, (function (exports,animations,coercion,core,forms,fading,of,distinctUntilChanged,Observable,defer,operators,Subject,common) { 'use strict';

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
     * An interface which allows a control to work inside of a `NtFormField`.
     * @abstract
     * @template T
     */
    var  /**
     * An interface which allows a control to work inside of a `NtFormField`.
     * @abstract
     * @template T
     */
    NtFormFieldControl = /** @class */ (function () {
        function NtFormFieldControl() {
        }
        /**  */
        /**
         *
         * @return {?}
         */
        NtFormFieldControl.prototype.focus = /**
         *
         * @return {?}
         */
        function () { };
        return NtFormFieldControl;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtFormFieldComponent = /** @class */ (function () {
        function NtFormFieldComponent(_ngZone, _changeDetectorRef, _parentForm, _parentFormGroup) {
            var _this = this;
            this._ngZone = _ngZone;
            this._changeDetectorRef = _changeDetectorRef;
            this._parentForm = _parentForm;
            this._parentFormGroup = _parentFormGroup;
            /**
             * 表单可见性
             */
            this._labelVisible = true;
            this._destroy = new Subject.Subject();
            this._invalid = false;
            this.statusChanges = defer.defer(function () {
                if (_this.control && _this.ngControl) {
                    return _this.ngControl.statusChanges ? _this.ngControl.statusChanges : Observable.Observable.of(null);
                }
                return _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(function () { return _this.statusChanges; }));
            });
            this.statusChanges.pipe(operators.takeUntil(this._destroy)).subscribe(function () { return _this._validate(); });
        }
        Object.defineProperty(NtFormFieldComponent.prototype, "labelVisible", {
            get: /**
             * @return {?}
             */
            function () { return this._labelVisible; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._labelVisible = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFormFieldComponent.prototype, "horizontal", {
            get: /**
             * @return {?}
             */
            function () { return this.orientation === 'horizontal'; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFormFieldComponent.prototype, "required", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.ngControl &&
                    this.ngControl.control &&
                    this.ngControl.control.validator) {
                    var /** @type {?} */ control = new forms.FormControl();
                    var /** @type {?} */ validateResult = this.ngControl.control.validator(control);
                    return validateResult && validateResult.hasOwnProperty('required');
                }
                if (this.control) {
                    return !!this.control.required;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFormFieldComponent.prototype, "errors", {
            get: /**
             * @return {?}
             */
            function () { return this.control.ngControl ? this.control.ngControl.errors : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFormFieldComponent.prototype, "ngSubmit", {
            get: /**
             * @return {?}
             */
            function () {
                if (this._parentForm || this._parentFormGroup) {
                    return (this._parentForm || this._parentFormGroup || /** @type {?} */ ({})).ngSubmit;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtFormFieldComponent.prototype, "ngControl", {
            get: /**
             * @return {?}
             */
            function () { return this.control ? this.control.ngControl : null; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtFormFieldComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.ngSubmit && this.ngControl) {
                this.ngSubmit.pipe(operators.takeUntil(this._destroy)).subscribe(function () { return _this._validate(); });
            }
        };
        /**
         * @return {?}
         */
        NtFormFieldComponent.prototype._validate = /**
         * @return {?}
         */
        function () {
            if (this.ngControl) {
                this._invalid = !!this.ngControl.invalid;
                this._changeDetectorRef.markForCheck();
            }
        };
        /**
         * @return {?}
         */
        NtFormFieldComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroy.next();
            this._destroy.complete();
        };
        NtFormFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-form-field',
                        template: "\n    <label class=\"nt-form-label\" [class.required]=\"required\" *ngIf=\"labelVisible\">{{label}}</label>\n    <div class=\"nt-form-group\">\n      <div class=\"nt-form-control\">\n        <ng-content></ng-content>\n      </div>\n      <span class=\"form-error is-visible\" *ngIf=\"_invalid\" [@fade]=\"_invalid\">\n        {{ (errors || {}) | ntFormError :label }}\n      </span>\n    </div>\n  ",
                        animations: [
                            animations.trigger('fade', [
                                animations.transition('* => false', fading.fadeOut(.15)),
                                animations.transition('* => true', fading.fadeIn(.15))
                            ])
                        ],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'nt-form-field',
                            '[class.nt-form-error]': '_invalid',
                            '[class.nt-form-horizontal]': 'horizontal'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtFormFieldComponent.ctorParameters = function () { return [
            { type: core.NgZone, },
            { type: core.ChangeDetectorRef, },
            { type: forms.NgForm, decorators: [{ type: core.Optional },] },
            { type: forms.FormGroupDirective, decorators: [{ type: core.Optional },] },
        ]; };
        NtFormFieldComponent.propDecorators = {
            "label": [{ type: core.Input },],
            "labelVisible": [{ type: core.Input },],
            "orientation": [{ type: core.Input },],
            "control": [{ type: core.ContentChild, args: [NtFormFieldControl,] },],
        };
        return NtFormFieldComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtFormAutofocusDirective = /** @class */ (function () {
        function NtFormAutofocusDirective(form, formGroup) {
            this._form = form || formGroup;
        }
        /**
         * @return {?}
         */
        NtFormAutofocusDirective.prototype.onSubmit = /**
         * @return {?}
         */
        function () {
            if (this._form.invalid) {
                var /** @type {?} */ field = this.fields.find(function (field) { return !!field.ngControl && !!field.ngControl.invalid; });
                if (field && field.control) {
                    field.control.focus();
                }
            }
        };
        NtFormAutofocusDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'form[ntFormAutofocus]',
                        host: {
                            '(submit)': 'onSubmit($event)'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtFormAutofocusDirective.ctorParameters = function () { return [
            { type: forms.NgForm, decorators: [{ type: core.Optional },] },
            { type: forms.FormGroupDirective, decorators: [{ type: core.Optional },] },
        ]; };
        NtFormAutofocusDirective.propDecorators = {
            "fields": [{ type: core.ContentChildren, args: [NtFormFieldComponent,] },],
        };
        return NtFormAutofocusDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ DEFAULT_TEMPLATES = {
        "required": "请填写{0}",
        "email": "{0}不是邮箱格式",
        "min": "{0}必须输入大于{1}的数字",
        "max": "{0}必须输入小于{1}的数字",
        "pattern": "{0}不是合法的数据",
        "maxlength": "{0}长度为最大{1}",
        "minlength": "{0}长度为最小{1}"
    };
    var NtFormValidationTransformer = /** @class */ (function () {
        function NtFormValidationTransformer() {
        }
        /**
         * @param {?=} errors
         * @param {?=} label
         * @return {?}
         */
        NtFormValidationTransformer.prototype.transform = /**
         * @param {?=} errors
         * @param {?=} label
         * @return {?}
         */
        function (errors, label) {
            if (!errors) {
                return '';
            }
            if (errors.hasOwnProperty('required')) {
                return this._format(DEFAULT_TEMPLATES['required'], label);
            }
            else if (errors.hasOwnProperty('email')) {
                return this._format(DEFAULT_TEMPLATES['email'], label);
            }
            else if (errors.hasOwnProperty('min')) {
                return this._format(DEFAULT_TEMPLATES['min'], label, errors["min"].min);
            }
            else if (errors.hasOwnProperty('max')) {
                return this._format(DEFAULT_TEMPLATES['max'], label, errors["max"].max);
            }
            else if (errors.hasOwnProperty('minlength')) {
                return this._format(DEFAULT_TEMPLATES['minlength'], label, errors["minlength"].requiredLength);
            }
            else if (errors.hasOwnProperty('maxlength')) {
                return this._format(DEFAULT_TEMPLATES['maxlength'], label, errors["maxlength"].requiredLength);
            }
            else if (errors.hasOwnProperty('pattern')) {
                return this._format(DEFAULT_TEMPLATES['pattern'], label);
            }
            else {
                return '';
            }
        };
        /**
         * @param {?} template
         * @param {...?} args
         * @return {?}
         */
        NtFormValidationTransformer.prototype._format = /**
         * @param {?} template
         * @param {...?} args
         * @return {?}
         */
        function (template) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return template.replace(/\{(\d+)\}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
        NtFormValidationTransformer.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NtFormValidationTransformer.ctorParameters = function () { return []; };
        return NtFormValidationTransformer;
    }());
    // export const NT_VALIDATION_TEMPLATE = new InjectionToken<NtValidationTemplate>('nt-validation-template');
    var /** @type {?} */ NT_VALIDATION_TRANSFOMER = new core.InjectionToken('nt-validation-transformer');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtFormErrorPipe = /** @class */ (function () {
        function NtFormErrorPipe(_transformer) {
            this._transformer = _transformer;
        }
        /**
         * @param {?} value
         * @param {...?} args
         * @return {?}
         */
        NtFormErrorPipe.prototype.transform = /**
         * @param {?} value
         * @param {...?} args
         * @return {?}
         */
        function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this._transformer.transform(value, args[0]);
        };
        NtFormErrorPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ntFormError' },] },
        ];
        /** @nocollapse */
        NtFormErrorPipe.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [NT_VALIDATION_TRANSFOMER,] },] },
        ]; };
        return NtFormErrorPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtFormsModule = /** @class */ (function () {
        function NtFormsModule() {
        }
        /**
         * @param {?=} transformer
         * @return {?}
         */
        NtFormsModule.forRoot = /**
         * @param {?=} transformer
         * @return {?}
         */
        function (transformer) {
            return {
                ngModule: NtFormsModule,
                providers: [
                    { provide: NT_VALIDATION_TRANSFOMER, useClass: transformer || NtFormValidationTransformer }
                ]
            };
        };
        NtFormsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
                        declarations: [NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
                    },] },
        ];
        /** @nocollapse */
        NtFormsModule.ctorParameters = function () { return []; };
        return NtFormsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtFormsModule = NtFormsModule;
    exports.NtFormErrorPipe = NtFormErrorPipe;
    exports.NtFormFieldComponent = NtFormFieldComponent;
    exports.NtFormFieldControl = NtFormFieldControl;
    exports.NtFormAutofocusDirective = NtFormAutofocusDirective;
    exports.DEFAULT_TEMPLATES = DEFAULT_TEMPLATES;
    exports.NtFormValidationTransformer = NtFormValidationTransformer;
    exports.NT_VALIDATION_TRANSFOMER = NT_VALIDATION_TRANSFOMER;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=forms.umd.js.map
