import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, isDevMode, NgZone, Optional, Output, Renderer2, Self, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NT_OPTION_PARENT_COMPONENT, NtOptionComponent, NtOverlayComponent, NtOptionModule, NtOverlayModule } from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

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
class NtSelectChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
class NtSelectComponent extends NtFormFieldControl {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} ngControl
     */
    constructor(_ngZone, _renderer, _elementRef, _changeDetectorRef, ngControl) {
        super();
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this.ngControl = ngControl;
        this._disabled = false;
        this._focused = false;
        this._filter = false;
        this._state = '';
        this._placeholder = '';
        this._multiple = false;
        this._required = false;
        this._compareWith = (o1, o2) => o1 === o2;
        this._onChange = () => { };
        this._onTouched = () => { };
        this._destroy = new Subject();
        this.selectionChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.optionSelectionChanges = defer(() => {
            if (this.options) {
                return merge(...this.options.map(option => option.selectionChange));
            }
            return this._ngZone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.optionSelectionChanges));
        });
        this.origin = new OverlayOrigin(_elementRef);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get triggerValue() {
        if (this.empty) {
            return '';
        }
        if (this._multiple) {
            const /** @type {?} */ selectedOptions = this._selectionModel.selected.map(option => option.label);
            return selectedOptions.join(', ');
        }
        return this._selectionModel.selected[0].label;
    }
    /**
     * @return {?}
     */
    get empty() { return !this._selectionModel || this._selectionModel.isEmpty(); }
    /**
     * @return {?}
     */
    get focused() { return this._focused; }
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
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get state() { return this._state; }
    /**
     * @return {?}
     */
    get width() { return this._width; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) { this._multiple = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * 选项是否可以过滤
     * TODO: 计划在 0.2.0 >= 版本中支持
     * @param {?} value
     * @return {?}
     */
    set filter(value) { this._filter = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get filter() { return this._filter; }
    /**
     * @return {?}
     */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) { this._placeholder = value; }
    /**
     * @return {?}
     */
    get placeholder() {
        if (this.empty) {
            return this._placeholder;
        }
        return this.filter ? this.triggerValue : this._placeholder;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    set compareWith(fn) {
        if (typeof fn !== 'function') {
            throw getNtSelectNonFunctionValueError();
        }
        else {
            this._compareWith = fn;
            if (this._selectionModel) {
                this._initializeSelection();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, undefined, false);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
            this._resetOptions();
            this._initializeSelection();
        });
    }
    /**
     * @return {?}
     */
    onResize() {
        this._width = this.inputElement.nativeElement.clientWidth;
    }
    /**
     * @return {?}
     */
    onOpen() {
        this._state = 'folded';
        this.onResize();
        setTimeout(() => this._scrollActiveOptionIntoView());
    }
    /**
     * @return {?}
     */
    onClose() {
        this._state = 'closed';
        this._onTouched();
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (!this.overlay.isOpen && !this._disabled) {
            this.overlay.show();
            this._focused = true;
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._focused = false;
    }
    /**
     * @return {?}
     */
    focus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
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
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    _resetOptions() {
        const /** @type {?} */ changedOrDestroyed = merge(this.options.changes, this._destroy);
        this.optionSelectionChanges
            .pipe(takeUntil(changedOrDestroyed), filter(event => event.isUserInput))
            .subscribe(event => {
            this._onSelect(event.source);
            if (!this.multiple && this.overlay.isOpen) {
                this.overlay.hide();
            }
        });
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        merge(...this.options.map(option => option.stateChanges))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    _initializeSelection() {
        Promise.resolve().then(() => {
            this._setSelectionByValue(this.ngControl ? this.ngControl.value : this.value);
            this._scrollActiveOptionIntoView();
        });
    }
    /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    _setSelectionByValue(value, isUserInput = false) {
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getNtSelectNonArrayValueError();
            }
            this._clearSelection();
            value.forEach((currentValue) => this._selectValue(currentValue, isUserInput));
            this._sortValues();
        }
        else {
            this._clearSelection();
            const /** @type {?} */ correspondingOption = this._selectValue(value, isUserInput);
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    _selectValue(value, isUserInput = false) {
        const /** @type {?} */ correspondingOption = this.options.find((option) => {
            try {
                return option.value != null && this._compareWith(option.value, value);
            }
            catch (/** @type {?} */ error) {
                if (isDevMode()) {
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
    }
    /**
     * @param {?=} fallbackValue
     * @return {?}
     */
    _propagateChanges(fallbackValue) {
        let /** @type {?} */ valueToEmit = null;
        if (this.multiple) {
            valueToEmit = (/** @type {?} */ (this.selected)).map(option => option.value);
        }
        else {
            valueToEmit = this.selected ? (/** @type {?} */ (this.selected)).value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this.selectionChange.emit(new NtSelectChange(this, valueToEmit));
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?=} skip
     * @return {?}
     */
    _clearSelection(skip) {
        this._selectionModel.clear();
        this.options.forEach(option => {
            if (option !== skip) {
                option.deselect();
            }
        });
    }
    /**
     * @return {?}
     */
    _sortValues() {
        if (this.multiple) {
            this._selectionModel.clear();
            this.options.forEach(option => {
                if (option.selected) {
                    this._selectionModel.select(option);
                }
            });
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    _onSelect(option) {
        const /** @type {?} */ wasSelected = this._selectionModel.isSelected(option);
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
    }
    /**
     * @return {?}
     */
    _scrollActiveOptionIntoView() {
        let /** @type {?} */ selected = null;
        if (this.selected instanceof NtOptionComponent) {
            selected = this.selected;
        }
        else if (this.selected instanceof Array && this.selected.length > 0) {
            selected = this.selected[0];
        }
        if (selected) {
            this.paneElement.nativeElement.scrollTop = selected.getOffsetY();
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
NtSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-select',
                template: "<input #inputElement type=\"text\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" (window:resize)=\"onResize()\" [readonly]=\"!filter\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" [value]=\"filter && focused ? '' : triggerValue\"> <span class=\"nt-select-caret\"></span> <nt-overlay [origin]=\"origin\" trigger=\"click\" position=\"bottomLeft\" fixed (opened)=\"onOpen()\" (closed)=\"onClose()\"> <div #paneElement class=\"nt-select-pane\" [class.folded]=\"state === 'folded'\" [style.width.px]=\"width\"> <ng-content></ng-content> </div> </nt-overlay> ",
                providers: [
                    { provide: NT_OPTION_PARENT_COMPONENT, useExisting: NtSelectComponent },
                    { provide: NtFormFieldControl, useExisting: NtSelectComponent }
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'nt-select nt-form-control',
                    '(resize)': 'onResize()',
                    '[class.focus]': 'overlay.isOpen'
                }
            },] },
];
/** @nocollapse */
NtSelectComponent.ctorParameters = () => [
    { type: NgZone, },
    { type: Renderer2, },
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
];
NtSelectComponent.propDecorators = {
    "disabled": [{ type: Input },],
    "required": [{ type: Input },],
    "multiple": [{ type: Input },],
    "filter": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "inputElement": [{ type: ViewChild, args: ['inputElement',] },],
    "paneElement": [{ type: ViewChild, args: ['paneElement',] },],
    "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
    "options": [{ type: ContentChildren, args: [NtOptionComponent,] },],
    "selectionChange": [{ type: Output },],
    "valueChange": [{ type: Output },],
    "compareWith": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtSelectModule {
}
NtSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NtOverlayModule, NtOptionModule],
                exports: [NtSelectComponent, NtOptionModule],
                declarations: [NtSelectComponent]
            },] },
];
/** @nocollapse */
NtSelectModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtSelectModule, getNtSelectDynamicMultipleError, getNtSelectNonArrayValueError, getNtSelectNonFunctionValueError, NtSelectChange, NtSelectComponent };
//# sourceMappingURL=select.js.map
