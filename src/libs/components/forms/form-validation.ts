import { Injectable, InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export const DEFAULT_TEMPLATES = {
  required: "请填写{0}",
  email: "{0}不是邮箱格式",
  min: "{0}必须输入大于{1}的数字",
  max: "{0}必须输入小于{1}的数字",
  pattern: "{0}不是合法的数据",
  maxlength: "{0}长度为最大{1}",
  minlength: "{0}长度为最小{1}",

  selection: '请选择{0}',
  upload: '请上传{0}',
  equalTo: '两次输入不一致',
  ltTo: '{0}的最小值应小于{1}',
  ltDateTo: '{0}应早于{1}',
  gtDateTo: '{0}应晚于{1}',
  unequalTo: '{0}必须和{1}不相同',
  intervalTo: '请输入正确区间值',
  notUnique: '{0}已存在',
  incorrect: '请输入正确{0}',
};

export interface NtValidationTransformer {
  transform(errors?: ValidationErrors, label?: string): string | null;
}

@Injectable()
export class NtFormValidationTransformer implements NtValidationTransformer {

  transform(errors?: ValidationErrors, label?: string, messages?: { [key: string]: string }) {

    if (!errors) {
      return '';
    }

    const templates = { ...DEFAULT_TEMPLATES, ...messages };

    /** Validators.required */
    if (errors.hasOwnProperty('required')) {

      /** 自定义 requiredSelection */
      if (errors.hasOwnProperty('selection')) {
        return this._format(templates['selection'], label);

        /** 自定义 requiredSelection */
      } else if (errors.hasOwnProperty('upload')) {
        return this._format(templates['upload'], label);
      }

      /** 默认必输入验证 */
      return this._format(templates['required'], label);

      /** 自定义 equalTo */
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
    } else if (errors.hasOwnProperty('equalTo')) {
      return this._format(templates['equalTo'], label, errors.equalLabel);

      /** 自定义 ltTo */
    } else if (errors.hasOwnProperty('ltTo')) {
      return this._format(templates['ltTo'], label, errors.ltLabel);

      /** 自定义 ltDateTo */
    } else if (errors.hasOwnProperty('ltDateTo')) {
      return this._format(templates['ltDateTo'], label, errors.ltLabel);

      /** 自定义 gtDateTo */
    } else if (errors.hasOwnProperty('gtDateTo')) {
      return this._format(templates['gtDateTo'], label, errors.gtLabel);

      /** 自定义 unequalTo */
    } else if (errors.hasOwnProperty('unequalTo')) {
      return this._format(templates['unequalTo'], label, errors.unequalLabel);

      /** 自定义 intervalTo */
    } else if (errors.hasOwnProperty('intervalTo')) {
      return this._format(templates['intervalTo']);

      /** 自定义 notUnique */
    } else if (errors.hasOwnProperty('notUnique')) {
      return this._format(templates['notUnique'], label);

      /** 自定义 incorrect */
    } else if (errors.hasOwnProperty('incorrect')) {
      return this._format(templates['incorrect'], label);
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

export const NT_VALIDATION_TRANSFOMER = new InjectionToken<NtValidationTransformer>('nt-validation-transformer');
