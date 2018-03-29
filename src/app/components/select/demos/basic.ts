import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-select-basic',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" ntFormAutofocus>
      <nt-form-field label="单选">
        <nt-select name="single" placeholder="单选" formControlName="single">
          <nt-option *ngFor="let alphabet of alphabets" [value]="alphabet">
            {{alphabet}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <nt-form-field label="多选">
        <nt-select name="multiple" placeholder="多选" formControlName="multiple" multiple>
          <nt-option *ngFor="let alphabet of alphabets" [value]="alphabet">
            <nt-ant-icon type="appstore1"></nt-ant-icon> {{alphabet}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <button class="button" type="submit">Submit</button>
    </form>
  `
})
export class DemoSelectBasciComponent {

  form: FormGroup;
  alphabets = Array(26).fill(0).map((v, index) => String.fromCharCode(65 + index));

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      single: [null, Validators.required],
      multiple: [null, Validators.required]
    });
  }

  submit() {

  }
}
