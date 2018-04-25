(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/cdk/overlay'), require('@angular/core'), require('@angular/forms'), require('@ng-tangram/components/core'), require('@ng-tangram/components/forms'), require('rxjs/observable/defer'), require('rxjs/observable/merge'), require('rxjs/operators'), require('rxjs/Subject'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/cdk/overlay', '@angular/core', '@angular/forms', '@ng-tangram/components/core', '@ng-tangram/components/forms', 'rxjs/observable/defer', 'rxjs/observable/merge', 'rxjs/operators', 'rxjs/Subject', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.select = {}),global.ng.cdk.coercion,global.ng.cdk.collections,global.ng.cdk.overlay,global.ng.core,global.ng.forms,global.nt.components.core,global.nt.components.forms,global.Rx.observable.defer,global.Rx.observable.merge,global.Rx.operators,global.Rx.Subject,global.ng.common));
}(this, (function (exports,coercion,collections,overlay,core,forms,core$1,forms$1,defer,merge,operators,Subject,common) { 'use strict';

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
     * @return {?}
     */
    function getNtSelectDynamicMultipleError() {
        return Error('Cannot change `multiple` mode of select after initialization.');
    }
    /**
     * @return {?}
     */
    function getNtSelectNonArrayValueError() {
        return Error('Value must be an array in multiple-selection mode.');
    }
    /**
     * @return {?}
     */
    function getNtSelectNonFunctionValueError() {
        return Error('`ntCompareWith` must be a function.');
    }
    var NtSelectChange = /** @class */ (function () {
        function NtSelectChange(source, value) {
            this.source = source;
            this.value = value;
        }
        return NtSelectChange;
    }());
    var NtSelectComponent = /** @class */ (function (_super) {
        __extends(NtSelectComponent, _super);
        function NtSelectComponent(_ngZone, _renderer, _elementRef, _changeDetectorRef, ngControl) {
            var _this = _super.call(this) || this;
            _this._ngZone = _ngZone;
            _this._renderer = _renderer;
            _this._elementRef = _elementRef;
            _this._changeDetectorRef = _changeDetectorRef;
            _this.ngControl = ngControl;
            _this._disabled = false;
            _this._focused = false;
            _this._filter = false;
            _this._state = '';
            _this._placeholder = '';
            _this._multiple = false;
            _this._required = false;
            _this._compareWith = function (o1, o2) { return o1 === o2; };
            _this._onChange = function () { };
            _this._onTouched = function () { };
            _this._destroy = new Subject.Subject();
            _this.selectionChange = new core.EventEmitter();
            _this.valueChange = new core.EventEmitter();
            _this.optionSelectionChanges = defer.defer(function () {
                if (_this.options) {
                    return merge.merge.apply(void 0, _this.options.map(function (option) { return option.selectionChange; }));
                }
                return _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1), operators.switchMap(function () { return _this.optionSelectionChanges; }));
            });
            _this.origin = new overlay.OverlayOrigin(_elementRef);
            if (_this.ngControl) {
                _this.ngControl.valueAccessor = _this;
            }
            return _this;
        }
        Object.defineProperty(NtSelectComponent.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "triggerValue", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.empty) {
                    return '';
                }
                if (this._multiple) {
                    var /** @type {?} */ selectedOptions = this._selectionModel.selected.map(function (option) { return option.label; });
                    return selectedOptions.join(', ');
                }
                return this._selectionModel.selected[0].label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "empty", {
            get: /**
             * @return {?}
             */
            function () { return !this._selectionModel || this._selectionModel.isEmpty(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "focused", {
            get: /**
             * @return {?}
             */
            function () { return this._focused; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "disabled", {
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
        Object.defineProperty(NtSelectComponent.prototype, "required", {
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
        Object.defineProperty(NtSelectComponent.prototype, "state", {
            get: /**
             * @return {?}
             */
            function () { return this._state; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "width", {
            get: /**
             * @return {?}
             */
            function () { return this._width; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "multiple", {
            get: /**
             * @return {?}
             */
            function () { return this._multiple; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._multiple = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "filter", {
            get: /**
             * @return {?}
             */
            function () { return this._filter; },
            set: /**
             * 选项是否可以过滤
             * TODO: 计划在 0.2.0 >= 版本中支持
             * @param {?} value
             * @return {?}
             */
            function (value) { this._filter = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () {
                return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "placeholder", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.empty) {
                    return this._placeholder;
                }
                return this.filter ? this.triggerValue : this._placeholder;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._placeholder = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtSelectComponent.prototype, "compareWith", {
            set: /**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                if (typeof fn !== 'function') {
                    throw getNtSelectNonFunctionValueError();
                }
                else {
                    this._compareWith = fn;
                    if (this._selectionModel) {
                        this._initializeSelection();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this._selectionModel = new collections.SelectionModel(this.multiple, undefined, false);
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.options.changes.pipe(operators.startWith(null), operators.takeUntil(this._destroy)).subscribe(function () {
                _this._resetOptions();
                _this._initializeSelection();
            });
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.onResize = /**
         * @return {?}
         */
        function () {
            this._width = this.inputElement.nativeElement.clientWidth;
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.onOpen = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._state = 'folded';
            this.onResize();
            setTimeout(function () { return _this._scrollActiveOptionIntoView(); });
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.onClose = /**
         * @return {?}
         */
        function () {
            this._state = 'closed';
            this._onTouched();
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.onFocus = /**
         * @return {?}
         */
        function () {
            if (!this.overlay.isOpen && !this._disabled) {
                this.overlay.show();
                this._focused = true;
            }
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.onBlur = /**
         * @return {?}
         */
        function () {
            this._focused = false;
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.inputElement.nativeElement.focus();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NtSelectComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.options) {
                this._setSelectionByValue(value);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NtSelectComponent.prototype.registerOnChange = /**
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
        NtSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouched = fn;
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NtSelectComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this._disabled = isDisabled;
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype._resetOptions = /**
         * @return {?}
         */
        function () {
            var _this = this;
            var /** @type {?} */ changedOrDestroyed = merge.merge(this.options.changes, this._destroy);
            this.optionSelectionChanges
                .pipe(operators.takeUntil(changedOrDestroyed), operators.filter(function (event) { return event.isUserInput; }))
                .subscribe(function (event) {
                _this._onSelect(event.source);
                if (!_this.multiple && _this.overlay.isOpen) {
                    _this.overlay.hide();
                }
            });
            // Listen to changes in the internal state of the options and react accordingly.
            // Handles cases like the labels of the selected options changing.
            merge.merge.apply(void 0, this.options.map(function (option) { return option.stateChanges; })).pipe(operators.takeUntil(changedOrDestroyed))
                .subscribe(function () {
                _this._changeDetectorRef.markForCheck();
            });
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype._initializeSelection = /**
         * @return {?}
         */
        function () {
            var _this = this;
            Promise.resolve().then(function () {
                _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this.value);
                _this._scrollActiveOptionIntoView();
            });
        };
        /**
         * @param {?} value
         * @param {?=} isUserInput
         * @return {?}
         */
        NtSelectComponent.prototype._setSelectionByValue = /**
         * @param {?} value
         * @param {?=} isUserInput
         * @return {?}
         */
        function (value, isUserInput) {
            var _this = this;
            if (isUserInput === void 0) { isUserInput = false; }
            if (this.multiple && value) {
                if (!Array.isArray(value)) {
                    throw getNtSelectNonArrayValueError();
                }
                this._clearSelection();
                value.forEach(function (currentValue) { return _this._selectValue(currentValue, isUserInput); });
                this._sortValues();
            }
            else {
                this._clearSelection();
                var /** @type {?} */ correspondingOption = this._selectValue(value, isUserInput);
            }
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} value
         * @param {?=} isUserInput
         * @return {?}
         */
        NtSelectComponent.prototype._selectValue = /**
         * @param {?} value
         * @param {?=} isUserInput
         * @return {?}
         */
        function (value, isUserInput) {
            var _this = this;
            if (isUserInput === void 0) { isUserInput = false; }
            var /** @type {?} */ correspondingOption = this.options.find(function (option) {
                try {
                    return option.value != null && _this._compareWith(option.value, value);
                }
                catch (/** @type {?} */ error) {
                    if (core.isDevMode()) {
                        console.warn(error);
                    }
                    return false;
                }
            });
            if (correspondingOption) {
                isUserInput ? correspondingOption.selectViaInteraction() : correspondingOption.select();
                this._selectionModel.select(correspondingOption);
            }
            return correspondingOption;
        };
        /**
         * @param {?=} fallbackValue
         * @return {?}
         */
        NtSelectComponent.prototype._propagateChanges = /**
         * @param {?=} fallbackValue
         * @return {?}
         */
        function (fallbackValue) {
            var /** @type {?} */ valueToEmit = null;
            if (this.multiple) {
                valueToEmit = (/** @type {?} */ (this.selected)).map(function (option) { return option.value; });
            }
            else {
                valueToEmit = this.selected ? (/** @type {?} */ (this.selected)).value : fallbackValue;
            }
            this._value = valueToEmit;
            this.valueChange.emit(valueToEmit);
            this._onChange(valueToEmit);
            this.selectionChange.emit(new NtSelectChange(this, valueToEmit));
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?=} skip
         * @return {?}
         */
        NtSelectComponent.prototype._clearSelection = /**
         * @param {?=} skip
         * @return {?}
         */
        function (skip) {
            this._selectionModel.clear();
            this.options.forEach(function (option) {
                if (option !== skip) {
                    option.deselect();
                }
            });
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype._sortValues = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.multiple) {
                this._selectionModel.clear();
                this.options.forEach(function (option) {
                    if (option.selected) {
                        _this._selectionModel.select(option);
                    }
                });
            }
        };
        /**
         * @param {?} option
         * @return {?}
         */
        NtSelectComponent.prototype._onSelect = /**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            var /** @type {?} */ wasSelected = this._selectionModel.isSelected(option);
            if (this.multiple) {
                this._selectionModel.toggle(option);
                wasSelected ? option.deselect() : option.select();
                this._sortValues();
            }
            else {
                this._clearSelection(option.value == null ? undefined : option);
                if (option.value == null) {
                    this._propagateChanges(option.value);
                }
                else {
                    this._selectionModel.select(option);
                }
            }
            if (wasSelected !== this._selectionModel.isSelected(option)) {
                this._propagateChanges();
            }
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype._scrollActiveOptionIntoView = /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ selected = null;
            if (this.selected instanceof core$1.NtOptionComponent) {
                selected = this.selected;
            }
            else if (this.selected instanceof Array && this.selected.length > 0) {
                selected = this.selected[0];
            }
            if (selected) {
                this.paneElement.nativeElement.scrollTop = selected.getOffsetY();
            }
        };
        /**
         * @return {?}
         */
        NtSelectComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroy.next();
            this._destroy.complete();
        };
        NtSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-select',
                        template: "<input #inputElement type=\"text\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" (window:resize)=\"onResize()\" [readonly]=\"!filter\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" [value]=\"filter && focused ? '' : triggerValue\"> <span class=\"nt-select-caret\"></span> <nt-overlay [origin]=\"origin\" trigger=\"click\" position=\"bottomLeft\" fixed (opened)=\"onOpen()\" (closed)=\"onClose()\"> <div #paneElement class=\"nt-select-pane\" [class.folded]=\"state === 'folded'\" [style.width.px]=\"width\"> <ng-content></ng-content> </div> </nt-overlay> ",
                        providers: [
                            { provide: core$1.NT_OPTION_PARENT_COMPONENT, useExisting: NtSelectComponent },
                            { provide: forms$1.NtFormFieldControl, useExisting: NtSelectComponent }
                        ],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'nt-select nt-form-control',
                            '(resize)': 'onResize()',
                            '[class.focus]': 'overlay.isOpen'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtSelectComponent.ctorParameters = function () { return [
            { type: core.NgZone, },
            { type: core.Renderer2, },
            { type: core.ElementRef, },
            { type: core.ChangeDetectorRef, },
            { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional },] },
        ]; };
        NtSelectComponent.propDecorators = {
            "disabled": [{ type: core.Input },],
            "required": [{ type: core.Input },],
            "multiple": [{ type: core.Input },],
            "filter": [{ type: core.Input },],
            "placeholder": [{ type: core.Input },],
            "inputElement": [{ type: core.ViewChild, args: ['inputElement',] },],
            "paneElement": [{ type: core.ViewChild, args: ['paneElement',] },],
            "overlay": [{ type: core.ViewChild, args: [core$1.NtOverlayComponent,] },],
            "options": [{ type: core.ContentChildren, args: [core$1.NtOptionComponent,] },],
            "selectionChange": [{ type: core.Output },],
            "valueChange": [{ type: core.Output },],
            "compareWith": [{ type: core.Input },],
        };
        return NtSelectComponent;
    }(forms$1.NtFormFieldControl));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtSelectModule = /** @class */ (function () {
        function NtSelectModule() {
        }
        NtSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, core$1.NtOverlayModule, core$1.NtOptionModule],
                        exports: [NtSelectComponent, core$1.NtOptionModule],
                        declarations: [NtSelectComponent]
                    },] },
        ];
        /** @nocollapse */
        NtSelectModule.ctorParameters = function () { return []; };
        return NtSelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtSelectModule = NtSelectModule;
    exports.getNtSelectDynamicMultipleError = getNtSelectDynamicMultipleError;
    exports.getNtSelectNonArrayValueError = getNtSelectNonArrayValueError;
    exports.getNtSelectNonFunctionValueError = getNtSelectNonFunctionValueError;
    exports.NtSelectChange = NtSelectChange;
    exports.NtSelectComponent = NtSelectComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=select.umd.js.map
