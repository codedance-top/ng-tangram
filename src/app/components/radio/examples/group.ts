import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'example-radio-group',
  template: `
    <form [formGroup]="form" ntFormOrientation="horizontal">
      <nt-radio-group formControlName="fruits">
        <nt-radio value="apple">苹果</nt-radio>
        <nt-radio value="melon">哈密瓜</nt-radio>
        <nt-radio value="strawberry">草莓</nt-radio>
        <nt-radio value="mango">芒果</nt-radio>
      </nt-radio-group>
    </form>

    {{ form.get('fruits').value}}
`
})
export class ExampleRadioGroupComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fruits: this.formBuilder.control('apple')
    });
  }
}
