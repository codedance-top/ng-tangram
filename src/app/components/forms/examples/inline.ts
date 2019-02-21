import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'example-form-inline',
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
export class ExampleFormInlineComponent {

  username = '';
  textarea = '';

  constructor() {

  }

  onLogin() {

  }
}
