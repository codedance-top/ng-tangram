import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, NgZone, Optional, ViewEncapsulation, ContentChildren, Directive, Injectable, InjectionToken, Inject, Pipe, NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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
 * An interface which allows a control to work inside of a `NtFormField`.
 * @abstract
 * @template T
 */
class NtFormFieldControl {
    /**
     *
     * @return {?}
     */
    focus() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtFormFieldComponent {
    /**
     * @param {?} _ngZone
     * @param {?} _changeDetectorRef
     * @param {?} _parentForm
     * @param {?} _parentFormGroup
     */
    constructor(_ngZone, _changeDetectorRef, _parentForm, _parentFormGroup) {
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        /**
         * 表单可见性
         */
        this._labelVisible = true;
        this._destroy = new Subject();
        this._invalid = false;
        this.statusChanges = defer(() => {
            if (this.control && this.ngControl) {
                return this.ngControl.statusChanges ? this.ngControl.statusChanges : Observable.of(null);
            }
            return this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.statusChanges));
        });
        this.statusChanges.pipe(takeUntil(this._destroy)).subscribe(() => this._validate());
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set labelVisible(value) { this._labelVisible = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get labelVisible() { return this._labelVisible; }
    /**
     * @return {?}
     */
    get horizontal() { return this.orientation === 'horizontal'; }
    /**
     * @return {?}
     */
    get required() {
        if (this.ngControl &&
            this.ngControl.control &&
            this.ngControl.control.validator) {
            const /** @type {?} */ control = new FormControl();
            const /** @type {?} */ validateResult = this.ngControl.control.validator(control);
            return validateResult && validateResult.hasOwnProperty('required');
        }
        if (this.control) {
            return !!this.control.required;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get errors() { return this.control.ngControl ? this.control.ngControl.errors : null; }
    /**
     * @return {?}
     */
    get ngSubmit() {
        if (this._parentForm || this._parentFormGroup) {
            return (this._parentForm || this._parentFormGroup || /** @type {?} */ ({})).ngSubmit;
        }
        return null;
    }
    /**
     * @return {?}
     */
    get ngControl() { return this.control ? this.control.ngControl : null; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.ngSubmit && this.ngControl) {
            this.ngSubmit.pipe(takeUntil(this._destroy)).subscribe(() => this._validate());
        }
    }
    /**
     * @return {?}
     */
    _validate() {
        if (this.ngControl) {
            this._invalid = !!this.ngControl.invalid;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }
}
NtFormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-form-field',
                template: `
    <label class="nt-form-label" [class.required]="required" *ngIf="labelVisible">{{label}}</label>
    <div class="nt-form-group">
      <div class="nt-form-control">
        <ng-content></ng-content>
      </div>
      <span class="form-error is-visible" *ngIf="_invalid" [@fade]="_invalid">
        {{ (errors || {}) | ntFormError :label }}
      </span>
    </div>
  `,
                animations: [
                    trigger('fade', [
                        transition('* => false', fadeOut(.15)),
                        transition('* => true', fadeIn(.15))
                    ])
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'nt-form-field',
                    '[class.nt-form-error]': '_invalid',
                    '[class.nt-form-horizontal]': 'horizontal'
                }
            },] },
];
/** @nocollapse */
NtFormFieldComponent.ctorParameters = () => [
    { type: NgZone, },
    { type: ChangeDetectorRef, },
    { type: NgForm, decorators: [{ type: Optional },] },
    { type: FormGroupDirective, decorators: [{ type: Optional },] },
];
NtFormFieldComponent.propDecorators = {
    "label": [{ type: Input },],
    "labelVisible": [{ type: Input },],
    "orientation": [{ type: Input },],
    "control": [{ type: ContentChild, args: [NtFormFieldControl,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtFormAutofocusDirective {
    /**
     * @param {?} form
     * @param {?} formGroup
     */
    constructor(form, formGroup) {
        this._form = form || formGroup;
    }
    /**
     * @return {?}
     */
    onSubmit() {
        if (this._form.invalid) {
            const /** @type {?} */ field = this.fields.find(field => !!field.ngControl && !!field.ngControl.invalid);
            if (field && field.control) {
                field.control.focus();
            }
        }
    }
}
NtFormAutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: 'form[ntFormAutofocus]',
                host: {
                    '(submit)': 'onSubmit($event)'
                }
            },] },
];
/** @nocollapse */
NtFormAutofocusDirective.ctorParameters = () => [
    { type: NgForm, decorators: [{ type: Optional },] },
    { type: FormGroupDirective, decorators: [{ type: Optional },] },
];
NtFormAutofocusDirective.propDecorators = {
    "fields": [{ type: ContentChildren, args: [NtFormFieldComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DEFAULT_TEMPLATES = {
    "required": "请填写{0}",
    "email": "{0}不是邮箱格式",
    "min": "{0}必须输入大于{1}的数字",
    "max": "{0}必须输入小于{1}的数字",
    "pattern": "{0}不是合法的数据",
    "maxlength": "{0}长度为最大{1}",
    "minlength": "{0}长度为最小{1}"
};
class NtFormValidationTransformer {
    /**
     * @param {?=} errors
     * @param {?=} label
     * @return {?}
     */
    transform(errors, label) {
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
    }
    /**
     * @param {?} template
     * @param {...?} args
     * @return {?}
     */
    _format(template, ...args) {
        return template.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }
}
NtFormValidationTransformer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NtFormValidationTransformer.ctorParameters = () => [];
// export const NT_VALIDATION_TEMPLATE = new InjectionToken<NtValidationTemplate>('nt-validation-template');
const /** @type {?} */ NT_VALIDATION_TRANSFOMER = new InjectionToken('nt-validation-transformer');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtFormErrorPipe {
    /**
     * @param {?} _transformer
     */
    constructor(_transformer) {
        this._transformer = _transformer;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        return this._transformer.transform(value, args[0]);
    }
}
NtFormErrorPipe.decorators = [
    { type: Pipe, args: [{ name: 'ntFormError' },] },
];
/** @nocollapse */
NtFormErrorPipe.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NT_VALIDATION_TRANSFOMER,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtFormsModule {
    /**
     * @param {?=} transformer
     * @return {?}
     */
    static forRoot(transformer) {
        return {
            ngModule: NtFormsModule,
            providers: [
                { provide: NT_VALIDATION_TRANSFOMER, useClass: transformer || NtFormValidationTransformer }
            ]
        };
    }
}
NtFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
                declarations: [NtFormFieldComponent, NtFormAutofocusDirective, NtFormErrorPipe],
            },] },
];
/** @nocollapse */
NtFormsModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtFormsModule, NtFormErrorPipe, NtFormFieldComponent, NtFormFieldControl, NtFormAutofocusDirective, DEFAULT_TEMPLATES, NtFormValidationTransformer, NT_VALIDATION_TRANSFOMER };
//# sourceMappingURL=forms.js.map
