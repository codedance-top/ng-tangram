import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'example-datepicker-forms',
  styles: [
    `
      .example-values {
        width: 100%;
        max-height: 100px;
        margin-top: 10px;
        overflow: auto;
      }
    `
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" ntFormAutofocus>
      <nt-form-field label="日期">
        <nt-datepicker placeholder="日期选择框" formControlName="normal" [dateFilter]="myFilter"></nt-datepicker>
      </nt-form-field>
      <nt-form-field label="日期范围">
        <nt-date-range-picker placeholder="请选择日期范围" formGroupName="range" required>
          <nt-date-range-start formControlName="start"></nt-date-range-start>
          <nt-date-range-end formControlName="end"></nt-date-range-end>
        </nt-date-range-picker>
      </nt-form-field>

      <button class="button" type="submit">Submit</button>
    </form>
    <div class="example-values">
      <div *ngFor="let val of values">{{val}}</div>
    </div>
  `
})
export class ExampleDatePickerFormsComponent {

  form: FormGroup;
  values: Array<Date> = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      normal: [null, Validators.required],
      range: this.formBuilder.group({
        start: [null, Validators.required],
        end: [null, Validators.required]
      })
    });
  }

  submit() {
    this.values.push(this.form.value.normal);
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // 过滤星期六和星期日。
    return day !== 0 && day !== 6;
  }
}
