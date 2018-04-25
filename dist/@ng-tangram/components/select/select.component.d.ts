import { OverlayOrigin } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NtOptionComponent, NtOptionParentComponent, NtOptionSelectionChange, NtOverlayComponent } from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { Observable } from 'rxjs/Observable';
export declare function getNtSelectDynamicMultipleError(): Error;
export declare function getNtSelectNonArrayValueError(): Error;
export declare function getNtSelectNonFunctionValueError(): Error;
export declare class NtSelectChange {
    source: NtSelectComponent;
    value: any;
    constructor(source: NtSelectComponent, value: any);
}
export declare class NtSelectComponent extends NtFormFieldControl<any> implements AfterContentInit, ControlValueAccessor, NtOptionParentComponent, OnDestroy {
    private _ngZone;
    private _renderer;
    private _elementRef;
    private _changeDetectorRef;
    ngControl: NgControl;
    readonly origin: OverlayOrigin;
    private _disabled;
    private _focused;
    private _filter;
    private _selectionModel;
    private _state;
    private _placeholder;
    private _width;
    private _multiple;
    private _value;
    private _viewValue;
    private _required;
    readonly value: any;
    readonly triggerValue: string;
    readonly empty: boolean;
    readonly focused: boolean;
    disabled: boolean;
    required: boolean;
    readonly state: string;
    readonly width: number;
    multiple: boolean;
    /**
     * 选项是否可以过滤
     * TODO: 计划在 0.2.0 >= 版本中支持
     */
    filter: boolean;
    readonly selected: NtOptionComponent | NtOptionComponent[];
    placeholder: string;
    inputElement: ElementRef;
    paneElement: ElementRef;
    overlay: NtOverlayComponent;
    options: QueryList<NtOptionComponent>;
    private _compareWith;
    private _onChange;
    private _onTouched;
    private readonly _destroy;
    readonly selectionChange: EventEmitter<NtSelectChange>;
    readonly valueChange: EventEmitter<any>;
    compareWith: (o1: any, o2: any) => boolean;
    readonly optionSelectionChanges: Observable<NtOptionSelectionChange>;
    constructor(_ngZone: NgZone, _renderer: Renderer2, _elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, ngControl: NgControl);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    onResize(): void;
    onOpen(): void;
    onClose(): void;
    onFocus(): void;
    onBlur(): void;
    focus(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    private _resetOptions();
    private _initializeSelection();
    private _setSelectionByValue(value, isUserInput?);
    private _selectValue(value, isUserInput?);
    private _propagateChanges(fallbackValue?);
    private _clearSelection(skip?);
    private _sortValues();
    private _onSelect(option);
    private _scrollActiveOptionIntoView();
    ngOnDestroy(): void;
}
