import { QueryList } from '@angular/core';
import { NgForm, FormGroupDirective, ControlContainer } from '@angular/forms';
import { NtFormFieldComponent } from './form-field.component';
export declare class NtFormAutofocusDirective {
    _form: ControlContainer;
    fields: QueryList<NtFormFieldComponent>;
    constructor(form: NgForm, formGroup: FormGroupDirective);
    onSubmit(): void;
}
