import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'example-radio-disabled',
  template: `
    <form [formGroup]="form" ntFormOrientation="horizontal">
      <nt-radio-group formControlName="disabled-group">
        <nt-radio value="disabled" disabled>disabled</nt-radio>
        <nt-radio value="disabled-checked" disabled>disabled-checked</nt-radio>
      </nt-radio-group>
    </form>
`
})
export class ExampleRadioDisabledComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'disabled-group': this.formBuilder.control('disabled-checked')
    });
  }
}
