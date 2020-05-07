import { Component } from '@angular/core';

@Component({
  selector: 'example-datepicker-filter',
  template: `
    <nt-datepicker placeholder="过滤可选日期" [dateFilter]="myFilter"></nt-datepicker>
  `
})
export class ExampleDatePickerFilterComponent {

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // 过滤星期六和星期日。
    return day !== 0 && day !== 6;
  }
}
