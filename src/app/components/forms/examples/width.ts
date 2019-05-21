import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AfterContentInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'example-form-width',
  template: `
   <div class="grid-x grid-margin-x">
    <div class="cell medium-6 large-4">
      <form (ngSubmit)="onLogin()" ntFormOrientation="horizontal">
        <nt-form-field label="用户名">
          <input ntInput type="text" name="username" [(ngModel)]="username" placeholder="用户名" required>
        </nt-form-field>
        <nt-form-field label="密码">
          <textarea ntInput name="password" [(ngModel)]="textarea" placeholder="密码" required></textarea>
        </nt-form-field>
        <nt-form-field labelVisible="false">
          <button type="submit" class="button expanded">Login</button>
        </nt-form-field>
      </form>
    </div>
  </div>
  `
})
export class ExampleFormWidthComponent implements AfterContentInit {

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
