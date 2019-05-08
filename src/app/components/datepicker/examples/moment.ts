import { Component } from '@angular/core';
import { Moment } from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, NT_MOMENT_DATE_FORMATS } from '@ng-tangram/moment-adapter';
import { DateAdapter, NT_DATE_FORMATS } from '@ng-tangram/components';

@Component({
  selector: 'example-datepicker-moment',
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
        <nt-datepicker placeholder="日期"  formControlName="momentDate" [dateFilter]="myFilter"></nt-datepicker>
      </nt-form-field>
      <button class="button" type="submit">Submit</button>
    </form>
    <div class="example-values">
      <div *ngFor="let val of values">{{val}}</div>
    </div>
  `,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: NT_DATE_FORMATS, useValue: NT_MOMENT_DATE_FORMATS }
  ],
})
export class ExampleDatePickerMomentComponent {

  form: FormGroup;
  values: Array<Moment> = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      momentDate: [null, Validators.required],
    });
  }

  submit() {
    this.values.push(this.form.value.momentDate);
  }

  myFilter = (d: Moment): boolean => {
    const day = d.isoWeekday();
    // 过滤星期六和星期日。
    return day !== 7 && day !== 6;
  }

}
