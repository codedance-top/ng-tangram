import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'demo-checkbox-basic',
  template: `
    <nt-checkbox checked="true">测试</nt-checkbox>
    <nt-checkbox checked="true" disabled>Disabled</nt-checkbox>

    <form [formGroup]="form" ntFormOrientation="horizontal">
      <nt-form-field label="水果2" [messages]="{ required: '请至少选择一个{0}', maxlength: '{0}最多只能选择{1}个' }">
        <nt-checkbox-group formControlName="fruits">
          <nt-checkbox value="apple">苹果</nt-checkbox>
          <nt-checkbox value="melon">哈密瓜</nt-checkbox>
          <nt-checkbox value="strawberry">草莓</nt-checkbox>
          <nt-checkbox value="mango" disabled>芒果</nt-checkbox>
        </nt-checkbox-group>
      </nt-form-field>
    </form>

    {{ form.get('fruits').value }}
  `
})
export class DemoCheckboxBasicComponent {

  form: FormGroup;

  fruits: any[] = ['apple'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fruits: this.formBuilder.control([], [Validators.required, Validators.maxLength(2)])
    });
  }
}
