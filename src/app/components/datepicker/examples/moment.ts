import { Moment } from 'moment';

import { Component } from '@angular/core';
import { DateAdapter, NT_DATE_FORMATS } from '@ng-tangram/components/core';
import { MomentDateAdapter, NT_MOMENT_DATE_FORMATS } from '@ng-tangram/moment-adapter';

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
    <nt-datepicker placeholder="日期" [(ngModel)]="momentDate"></nt-datepicker>
    <div>{{momentDate}}</div>
  `,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: NT_DATE_FORMATS, useValue: NT_MOMENT_DATE_FORMATS }
  ],
})
export class ExampleDatePickerMomentComponent {
  momentDate: Moment;
}
