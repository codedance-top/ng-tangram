import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'example-datepicker-forms',
  template: `
  <form [formGroup]="form" (ngSubmit)="submit()" ntFormAutofocus>
    <nt-form-field label="正常">
      <nt-datepicker
        placeholder="普通的日期选择框" formControlName="normal"></nt-datepicker>
    </nt-form-field>
    <nt-form-field label="参数">
      <nt-datepicker placeholder="带参数的日期选择框" [minDate]="minDate" [maxDate]="maxDate" formControlName="params"></nt-datepicker>
    </nt-form-field>
    <button class="button" type="submit">Submit</button>
  </form>
  `
})
export class ExampleDatePickerFormsComponent {
  form: FormGroup;

  maxDate = new Date(2019, 11, 31);
  minDate = new Date(2000, 0, 1);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      normal: [null, Validators.required],
      params: [null, Validators.required]
    });
  }

  submit() {
  }
}
