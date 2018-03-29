import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'demo-form-inline',
  template: `
  <div class="grid-x grid-margin-x">
    <div class="cell medium-6 large-4">
      <form (ngSubmit)="onLogin()">
        <nt-form-field label="用户名">
          <input ntInput type="text" name="username" placeholder="用户名">
        </nt-form-field>
        <nt-form-field label="密码">
          <textarea ntInput name="password" [(ngModel)]="textarea" placeholder="密码" required></textarea>
        </nt-form-field>
        <button type="submit" class="button expanded">Login</button>
      </form>
    </div>
  </div>
  `
})
export class DemoFormInlineComponent {

  usernameModel = '';
  textarea = '';

  username: FormControl;
  password: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.username = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  }

  onLogin() {

  }
}
