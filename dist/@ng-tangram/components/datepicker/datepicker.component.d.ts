import { OverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef, NgZone, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DateAdapter, NtDateFormats, NtOverlayComponent } from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';
import { NtDatePickerCalendarComponent } from './calendar.component';
export declare class NtDatePickerComponent<D> extends NtFormFieldControl<D> implements ControlValueAccessor {
    private _dateAdapter;
    private _dateFormats;
    private _elementRef;
    private _ngZone;
    private _renderer;
    ngControl: NgControl;
    readonly origin: OverlayOrigin;
    private _disabled;
    private _lastValueValid;
    private _readonly;
    private _required;
    private _value;
    private _startAt;
    private _minDate;
    private _maxDate;
    private _focused;
    readonly empty: boolean;
    readonly focused: boolean;
    value: D | null;
    placeholder: string;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    startAt: D | null;
    minDate: D | null;
    maxDate: D | null;
    dateFilter: (date: D) => boolean;
    inputElement: ElementRef;
    overlay: NtOverlayComponent;
    calendar: NtDatePickerCalendarComponent<D>;
    /** Emits when the value changes (either due to user input or programmatic change). */
    private _valueChange;
    private _onChange;
    private _onTouched;
    constructor(_dateAdapter: DateAdapter<D>, _dateFormats: NtDateFormats, _elementRef: ElementRef, _ngZone: NgZone, _renderer: Renderer2, ngControl: NgControl);
    writeValue(value: D): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    _onInputFocus(): void;
    onOpen(): void;
    onClose(): void;
    focus(): void;
    select(date: D): void;
    clear(): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj);
}
