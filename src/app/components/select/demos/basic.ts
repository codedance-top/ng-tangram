import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-select-basic',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" ntFormAutofocus>
      <nt-form-field label="单选">
        <nt-select name="single" placeholder="单选" formControlName="single" filter (valueChange)="onChange($event)">
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

    <nt-select name="multiple" placeholder="多选" [(ngModel)]="value" multiple required>
      <nt-option *ngFor="let alphabet of alphabets" [value]="alphabet">
        <nt-ant-icon type="appstore1"></nt-ant-icon> {{alphabet}}
      </nt-option>
    </nt-select>
  `
})
export class DemoSelectBasciComponent {

  form: FormGroup;
  alphabets = Array(26).fill(65).map((value, index) => String.fromCharCode(value + index));

  value = ['A'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      single: ['Z', Validators.required],
      multiple: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  submit() {

  }

  onChange(value: any) {
    console.log(value);
  }
}
