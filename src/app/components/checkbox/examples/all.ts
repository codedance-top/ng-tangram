import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NtCheckboxChange } from '@ng-tangram/components/checkbox';

@Component({
  selector: 'example-checkbox-all',
  template: `
    <nt-checkbox [indeterminate]="indeterminate" [checked]="isAll" (change)="onChange($event)">测试</nt-checkbox>
    <form [formGroup]="form" ntFormOrientation="horizontal">
      <nt-checkbox-group formControlName="fruits">
        <nt-checkbox value="apple">苹果</nt-checkbox>
        <nt-checkbox value="melon">哈密瓜</nt-checkbox>
        <nt-checkbox value="strawberry">草莓</nt-checkbox>
        <nt-checkbox value="mango">芒果</nt-checkbox>
      </nt-checkbox-group>
    </form>
  `
})
export class ExampleCheckboxAllComponent {

  form: FormGroup;

  fruits: any[] = ['apple'];

  checkbox: FormControl;

  indeterminate = false;

  isAll = false;

  constructor(private formBuilder: FormBuilder) {

    this.checkbox = this.formBuilder.control('');

    this.form = this.formBuilder.group({
      fruits: this.formBuilder.control(['apple'])
    });

    this.indeterminate = this.form.get('fruits').value.length > 0;

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
