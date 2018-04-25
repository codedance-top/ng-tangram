import { ModuleWithProviders, Type } from '@angular/core';
import { NtValidationTransformer } from './form-validation';
export declare class NtFormsModule {
    static forRoot(transformer?: Type<NtValidationTransformer>): ModuleWithProviders;
}
