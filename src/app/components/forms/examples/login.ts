import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AfterContentInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { requiredSelection } from '@ng-tangram/components/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export function compareProductValueValidator(ltLabel?: string): ValidatorFn {
  return  (control: FormGroup): ValidationErrors | null =>  {
    console.log(2);
    const originalPrice = control.get('username');
    const alterEgo = control.get('password');
    const originalLength = coerceNumberProperty(originalPrice.value?.length, 0);
    const alterEgoLength = coerceNumberProperty(alterEgo.value?.length, 0);
    console.log(alterEgoLength <= originalLength ? null : { ltTo: true, ltLabel });
    return alterEgoLength <= originalLength ? null : { ltTo: true, ltLabel };
  }
}

@Component({
  selector: 'example-form-login',
  template: `
  <div class="grid-x grid-margin-x">
    <div class="cell medium-6 large-4">
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()" ntFormAutofocus>
        <nt-form-field label="用户名">
          <input ntInput type="text" name="username" formControlName="username" placeholder="用户名">
          <p class="help-text">请输入小于20个字符的文字</p>
        </nt-form-field>
        <nt-form-field label="密码">
          <input ntInput type="password" name="password" formControlName="password" placeholder="密码">
        </nt-form-field>
        <nt-form-field label="邮件" *ngIf="loginForm.get('email')">
          <input ntInput type="text" name="email" formControlName="email" placeholder="abc@de.com">
        </nt-form-field>
        <nt-form-field label="手机">
          <input ntInput type="text" name="phone" formControlName="phone" placeholder="手机">
        </nt-form-field>
        <nt-form-field label="性别">
          <nt-select formControlName="select" placeholder="select">
            <nt-option value="male">男</nt-option>
            <nt-option value="female">女</nt-option>
          </nt-select>
        </nt-form-field>
        <nt-form-field label="生日">
          <nt-datepicker formControlName="datepicker" placeholder="datepicker"></nt-datepicker>
        </nt-form-field>
        <div class="grid-x">
          <div class="small-7 columns">
            <div class="icheck">
              <input id="remember" type="checkbox"><label for="remember">记住我</label>
            </div>
          </div>
          <div class="small-5 columns" style="text-align: right;">
            <a>忘记密码</a>
          </div>
        </div>
        <button type="submit" class="button expanded">Login</button>
      </form>
      <p>还没有账号？<a>现在注册!</a></p>
      <nt-callout *ngIf="formValues">
        {{ formValues | json }}
      </nt-callout>
    </div>
  </div>
  `
})
export class ExampleFormLoginComponent implements AfterContentInit {

  loginForm: FormGroup;
  loginSubject = new Subject<FormGroup>();

  email: FormControl;

  schedule: FormArray;

  formValues: any;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^1[345678]\d{9}$/)]],
      select: ['', [requiredSelection]],
      datepicker: ['', [requiredSelection]],
    }, {
      validators: compareProductValueValidator('划线价格')
    });

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.loginSubject
      .pipe(filter(form => form.valid))
      .subscribe(form => {
        this.formValues = form.value;
      });
  }

  onLogin() {
    this.loginSubject.next(this.loginForm);
  }

  ngAfterContentInit() {

  }
}
