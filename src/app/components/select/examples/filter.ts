import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'example-select-filter',
  template: `
    <form [formGroup]="form" ntFormAutofocus>
      <nt-form-field label="可筛选下拉框">
        <nt-select name="single" placeholder="筛选下拉框" formControlName="single" filter>
          <nt-option *ngFor="let alphabet of alphabets" [value]="alphabet">
            {{alphabet}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <button class="button" type="submit">Submit</button>
    </form>
  `
})
export class ExampleSelectFilterComponent {

  form: FormGroup;
  alphabets = Array(26).fill(65).map((value, index) => String.fromCharCode(value + index));

  value = ['A'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      single: []
    });
  }
}
