import { InjectionToken } from "@angular/core";

export interface NtInvalidHandler {
  handler(): void;
}

export class NtFormConfig {
  invalidClass?: string = 'has-error';
  validClass?: string = 'has-success';
  invalidMessage: (e: { [key: string]: string }) => string;
}

export const NT_FORM_CONFIG = new InjectionToken<NtFormConfig>('nt-form-config');
