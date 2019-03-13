import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'example-radio-basic',
  template: `

  <form [formGroup]="form" ntFormOrientation="horizontal">
    <nt-form-field label="水果2" [messages]="{ required: '请选择{0}' }">
      <nt-radio-group formControlName="fruits">
        <nt-radio value="apple">苹果</nt-radio>
        <nt-radio value="melon" disabled>哈密瓜</nt-radio>
        <nt-radio value="strawberry">草莓</nt-radio>
        <nt-radio value="mango">芒果</nt-radio>
      </nt-radio-group>
    </nt-form-field>
  </form>

  {{ form.get('fruits').value }}
  `
})
export class ExampleRadioBasicComponent {

  form: FormGroup;

  fruits = 'apple';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fruits: this.formBuilder.control('apple', [Validators.required])
    });
  }
}
