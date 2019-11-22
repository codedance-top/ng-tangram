import { Injectable, InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export const DEFAULT_TEMPLATES = {
  "required": "请填写{0}",
  "email": "{0}不是邮箱格式",
  "min": "{0}必须输入大于{1}的数字",
  "max": "{0}必须输入小于{1}的数字",
  "pattern": "{0}不是合法的数据",
  "maxlength": "{0}长度为最大{1}",
  "minlength": "{0}长度为最小{1}"
};

// export class NtValidationTemplate {
//   required = '请填写{0}';
//   email = '{0}不是邮箱格式';
//   min = '{0}必须输入大于{1}的数字';
//   max = '{0}必须输入小于{1}的数字';
//   pattern = '{0}不是合法的数据';
//   maxlength = '{0}长度为最大{1}';
//   minlength = '{0}长度为最小{1}';
// }

export interface NtValidationTransformer {
  transform(errors?: ValidationErrors, label?: string): string | null;
}

@Injectable()
export class NtFormValidationTransformer implements NtValidationTransformer {

  transform(errors?: ValidationErrors, label?: string, messages?: { [key: string]: string }) {
    if (!errors) {
      return '';
    }

    const templates = { ...DEFAULT_TEMPLATES , ...messages };

    if (errors.hasOwnProperty('required')) {
      return this._format(templates['required'], label);
    } else if (errors.hasOwnProperty('email')) {
      return this._format(templates['email'], label);
    } else if (errors.hasOwnProperty('min')) {
      return this._format(templates['min'], label, errors.min.min);
    } else if (errors.hasOwnProperty('max')) {
      return this._format(templates['max'], label, errors.max.max);
    } else if (errors.hasOwnProperty('minlength')) {
      return this._format(templates['minlength'], label, errors.minlength.requiredLength);
    } else if (errors.hasOwnProperty('maxlength')) {
      return this._format(templates['maxlength'], label, errors.maxlength.requiredLength);
    } else if (errors.hasOwnProperty('pattern')) {
      return this._format(templates['pattern'], label);
    } else {
      return '';
    }
  }

  protected _format(template: string, ...args: any[]) {
    return template.replace(/\{(\d+)\}/g, function (match: any, number: number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  }
}

// export const NT_VALIDATION_TEMPLATE = new InjectionToken<NtValidationTemplate>('nt-validation-template');

export const NT_VALIDATION_TRANSFOMER = new InjectionToken<NtValidationTransformer>('nt-validation-transformer');
