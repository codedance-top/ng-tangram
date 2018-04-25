import { PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NtValidationTransformer } from './form-validation';
export declare class NtFormErrorPipe implements PipeTransform {
    private _transformer;
    constructor(_transformer: NtValidationTransformer);
    transform(value: ValidationErrors, ...args: any[]): string | null;
}
