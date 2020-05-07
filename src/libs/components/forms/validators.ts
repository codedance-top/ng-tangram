import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DateAdapter } from '@ng-tangram/components/core';

/**
 * 验证是否必须选择
 * @param control 控件
 * @description 在选项组件中替换 required，在错误时会输出更友好的验证提示
 */
export function requiredSelection (control: AbstractControl): ValidationErrors | null {
  const errors = Validators.required(control);
  return errors && errors.required ? { required: true, selection: true } : null;
}

/**
 * 验证是否必须上传
 * @param control 控件
 * @description 在选项组件中替换 required，在错误时会输出更友好的验证提示
 */
export function requiredUpload (control: AbstractControl): ValidationErrors | null {
  const errors = Validators.required(control);
  return errors && errors.required ? { required: true, upload: true } : null;
}

/**
 * 验证是否于目标控件的值相同
 * @param equalControl 比较的目标控件
 * @param equalLabel 目标控件的字段名，可选
 */
export function equalTo (equalControl: AbstractControl, equalLabel: string): ValidatorFn {
  let subscribe: Subscription;

  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!subscribe) {
      subscribe = equalControl.valueChanges
        .pipe(filter(() => control.touched))
        .subscribe(() => {
          control.updateValueAndValidity();
        });
    }

    const controlValue = control.value;

    // tslint:disable-next-line:triple-equals
    return equalControl.value == controlValue ? null : { equalTo: true, equalLabel };
  };
}

/**
 * 验证是否于目标控件的值不相同，与 equalTo 相反
 * @param equalControl 比较的目标控件
 * @param unequalLabel 目标控件的字段名，可选
 */
export function unequalTo (equalControl: AbstractControl, unequalLabel?: string): ValidatorFn {
  let subscribe: Subscription;
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!subscribe) {
      subscribe = equalControl.valueChanges
        .pipe(filter(() => control.touched))
        .subscribe(() => {
          control.updateValueAndValidity();
        });
    }

    const controlValue: string = control.value;

    return equalControl.value !== controlValue ? null : { unequalTo: true, unequalLabel };
  };
}

export function interval (intervalLabel?: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const controlValue: string = control.value.split(/(\(|\)|\[|\]|,)/g);
      return Number(controlValue[2]) < Number(controlValue[4]) ? null : { intervalTo: true, intervalLabel };
    }
    return null;
  };
}

/**
 * 验证控件是否小于目标控件的值
 * @param withControl 比较的目标控件
 * @param ltLabel 目标控件的字段名，可选
 */
export function ltTo (withControl: AbstractControl, ltLabel?: string): ValidatorFn {
  let subscribe: Subscription;
  return (control: AbstractControl): { [key: string]: any } | null => {

    if (!subscribe) {
      subscribe = withControl.valueChanges
        .pipe(filter(() => control.touched))
        .subscribe(() => {
          control.updateValueAndValidity();
        });
    }

    const controlValue: string = control.value;

    if (withControl.value) {
      return Number(controlValue) < Number(withControl.value) ? null : { ltTo: true, ltLabel };
    }
    return null;
  };
}

/**
 * 验证日期是否小于目标控件的值
 * @param withControl 比较的目标控件
 * @param ltLabel 目标控件的字段名
 */
export function ltDateTo (withControl: AbstractControl, ltLabel: string, dateAdapter: DateAdapter<any>): ValidatorFn {
  let subscribe: Subscription;
  return (control: AbstractControl): { [key: string]: any } | null => {

    if (!subscribe) {
      subscribe = withControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    if (withControl.value && control.value) {
      return dateAdapter.compareDate(
        dateAdapter.deserialize(control.value),
        dateAdapter.deserialize(withControl.value)) < 0 ? null : { ltDateTo: true, ltLabel };
    }
    return null;
  };
}

/**
 * 验证日期是否大于目标控件的值
 * @param withControl 比较的目标控件
 * @param gtLabel 目标控件的字段名
 */
export function gtDateTo (withControl: AbstractControl, gtLabel: string, dateAdapter: DateAdapter<any>): ValidatorFn {
  let subscribe: Subscription;
  return (control: AbstractControl): { [key: string]: any } | null => {

    if (!subscribe) {
      subscribe = withControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    if (withControl.value && control.value) {
      return dateAdapter.compareDate(
        dateAdapter.deserialize(control.value),
        dateAdapter.deserialize(withControl.value)) > 0 ? null : { gtDateTo: true, gtLabel };
    }
    return null;
  };
}