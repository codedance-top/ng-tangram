import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NtCheckboxChange } from '@ng-tangram/components';

@Component({
  selector: 'demo-checkbox-basic',
  template: `

    <nt-checkbox checked="true" disabled>Disabled</nt-checkbox>
    <nt-checkbox [indeterminate]="indeterminate" [checked]="isAll" (change)="onChange($event)">测试</nt-checkbox>
    <form [formGroup]="form" ntFormOrientation="horizontal">
      <nt-form-field label="水果" [messages]="{ required: '请至少选择一个{0}', maxlength: '{0}最多只能选择{1}个' }">
        <nt-checkbox-group formControlName="fruits">
          <nt-checkbox value="apple">苹果</nt-checkbox>
          <nt-checkbox value="melon">哈密瓜</nt-checkbox>
          <nt-checkbox value="strawberry">草莓</nt-checkbox>
          <nt-checkbox value="mango">芒果</nt-checkbox>
        </nt-checkbox-group>
      </nt-form-field>
    </form>
  `
})
export class DemoCheckboxBasicComponent {

  form: FormGroup;

  fruits: any[] = ['apple'];

  checkboxModel = false;

  checkbox: FormControl;

  indeterminate = false;

  isAll = false;

  constructor(private formBuilder: FormBuilder) {

    this.checkbox = this.formBuilder.control('');

    this.form = this.formBuilder.group({
      fruits: this.formBuilder.control([], [Validators.required])
    });

    this.form.get('fruits').valueChanges.subscribe(value => {
      this.indeterminate = value.length > 0;
      this.isAll = value.length === 4;
    });


  }

  onChange(change: NtCheckboxChange) {
    if (change.checked) {
      this.form.get('fruits').setValue(['apple', 'melon', 'strawberry', 'mango']);
    } else {
      this.form.get('fruits').setValue([]);
    }
  }
}
