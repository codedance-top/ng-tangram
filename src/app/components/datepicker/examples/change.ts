import { Component } from '@angular/core';

@Component({
  selector: 'example-datepicker-change',
  styles: [
    `
      .example-events {
        width: 90%;
        height: 100px;
        overflow: auto;
        margin-bottom: 10px;
      }
    `
  ],
  template: `
    <div class="example-events">
      <div *ngFor="let e of events">{{e}}</div>
    </div>
    <nt-datepicker placeholder="日期"
      (afterOpen)="afterOpen()"
      (afterClosed)="afterClosed()"
      (beforeOpen)="beforeOpen()"
      (beforeClosed)="beforeClosed()"
    ></nt-datepicker>

  `
})
export class ExampleDatePickerChangeComponent {
  events: string[] = [];

  // 选择面板打开后
  afterOpen() {
    this.events.push('触发选择面板打开后事件回调');
  }

  // 选择面板关闭后
  afterClosed() {
    this.events.push('触发选择面板关闭后事件回调');
  }

  // 选择面板打开前
  beforeOpen() {
    this.events.push('触发选择面板打开前事件回调');
  }

  // 选择面板关闭前
  beforeClosed() {
    this.events.push('触发选择面板关闭前事件回调');
  }
}
