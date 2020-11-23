import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'example-datepicker-boundary',
  template: `
      <nt-datepicker placeholder="限制日期选择" [min]="minDate" [max]="maxDate"></nt-datepicker>
  `
})
export class ExampleDatePickerBoundaryComponent {
  form: FormGroup;

  maxDate = new Date(2020, 4, 15);
  minDate = new Date(2019, 5, 15);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      normal: [null, Validators.required],
      params: [null, Validators.required]
    });
  }

  submit() {
  }
}
