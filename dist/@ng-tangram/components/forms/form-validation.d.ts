import { InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
export declare const DEFAULT_TEMPLATES: {
    "required": string;
    "email": string;
    "min": string;
    "max": string;
    "pattern": string;
    "maxlength": string;
    "minlength": string;
};
export interface NtValidationTransformer {
    transform(errors?: ValidationErrors, label?: string): string | null;
}
export declare class NtFormValidationTransformer implements NtValidationTransformer {
    transform(errors?: ValidationErrors, label?: string): string;
    protected _format(template: string, ...args: any[]): string;
}
export declare const NT_VALIDATION_TRANSFOMER: InjectionToken<NtValidationTransformer>;
