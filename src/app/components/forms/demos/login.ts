import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'demo-form-login',
  template: `
  <div class="grid-x grid-margin-x">
    <div class="cell medium-6 large-4">
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()" ntFormAutofocus>
        <nt-form-field ntLabel="用户名" ntLabelOrientation="horizontal">
          <input type="text" name="username" formControlName="username" placeholder="用户名">
        </nt-form-field>
        <nt-form-field ntLabel="密码" ntLabelOrientation="horizontal">
          <input type="password" name="password" formControlName="password" placeholder="密码">
        </nt-form-field>
        <nt-form-field ntLabel="选择框" ntLabelOrientation="horizontal">
          <nt-select formControlName="select" placeholder="select">
            <nt-option ntValue="1">1</nt-option>
            <nt-option ntValue="2">2</nt-option>
          </nt-select>
        </nt-form-field>
        <nt-form-field ntLabel="日期选择" ntLabelOrientation="horizontal">
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
export class DemoFormLoginComponent {

  loginForm: FormGroup;
  loginSubject = new Subject<FormGroup>();

  formValues: any;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      select: ['', Validators.required],
      datepicker: ['', Validators.required],
    });

    this.loginSubject
      .filter(form => form.valid)
      .subscribe(form => {
        this.formValues = form.value;
      });
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.loginSubject.next(this.loginForm);
  }
}
