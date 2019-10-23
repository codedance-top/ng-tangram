import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'example-select-multiple',
  template: `
    <form [formGroup]="form" ntFormAutofocus>
      <nt-form-field label="多选下拉框">
        <nt-select name="multiple" placeholder="多选" formControlName="multiple" filter multiple>
          <nt-option *ngFor="let alphabet of alphabets" [value]="alphabet">
            {{alphabet}}
          </nt-option>
        </nt-select>
      </nt-form-field>
      <button class="button" type="submit">Submit</button>
    </form>
  `
})
export class ExampleSelectMultipleComponent {

  form: FormGroup;
  alphabets = Array(26).fill(65).map((value, index) => String.fromCharCode(value + index));

  value = ['A'];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      multiple: [null, [Validators.required, Validators.minLength(3)]]
    });
  }
}
