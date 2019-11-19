import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AfterContentInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
        <nt-form-field label="选择框">
          <nt-select formControlName="select" placeholder="select" filter>
            <nt-option value="1">1</nt-option>
            <nt-option value="2">2</nt-option>
          </nt-select>
        </nt-form-field>
        <nt-form-field label="日期选择">
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
      // email: ['', [Validators.required, Validators.email]],
      // schedule: this.schedule = this.formBuilder.array(Array(5).fill(this.formBuilder.control('', Validators.required))),
      phone: ['', [Validators.required, Validators.pattern(/^1[345678]\d{9}$/)]],
      select: ['', [Validators.required, Validators.min(2), Validators.max(5)]],
      datepicker: ['', [Validators.required]],
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
