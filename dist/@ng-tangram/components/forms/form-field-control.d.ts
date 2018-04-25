import { NgControl } from '@angular/forms';
/** An interface which allows a control to work inside of a `NtFormField`. */
export declare abstract class NtFormFieldControl<T> {
    /** The value of the control. */
    value: T | null;
    /** The placeholder for this control. */
    readonly placeholder: string;
    /** Gets the NgControl for this control. */
    readonly ngControl: NgControl | null;
    /** Whether the control is focused. */
    readonly focused: boolean;
    /** Whether the control is empty. */
    readonly empty: boolean;
    /** Whether the control is required. */
    readonly required: boolean;
    /** Whether the control is disabled. */
    readonly disabled: boolean;
    /**  */
    focus(): void;
}
