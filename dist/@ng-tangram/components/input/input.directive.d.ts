import { ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NgControl } from '@angular/forms';
export declare class NtInputDirective extends NtFormFieldControl<any> {
    ngControl: NgControl;
    private _platform;
    private _elementRef;
    private _disabled;
    private _value;
    private _type;
    private _readonly;
    private _required;
    _focused: boolean;
    placeholder: string;
    disabled: boolean;
    required: boolean;
    /** Input type of the element. */
    type: string;
    value: string;
    readonly: boolean;
    readonly empty: boolean;
    constructor(ngControl: NgControl, _platform: Platform, _elementRef: ElementRef);
    focus(): void;
    _focusChanged(isFocused: boolean): void;
    protected _isBadInput(): boolean;
    /** Determines if the component host is a textarea. If not recognizable it returns false. */
    private _isTextarea();
}
