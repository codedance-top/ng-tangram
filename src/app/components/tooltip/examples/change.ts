import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-change',
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

    <nt-tooltip title="标题"
      (afterOpen)="afterOpen()"
      (afterClosed)="afterClosed()"
      (beforeOpen)="beforeOpen()"
      (beforeClosed)="beforeClosed()">
      <a class="button">提示</a>
    </nt-tooltip>
    <div class="example-events">
      <div *ngFor="let e of events">{{e}}</div>
    </div>

  `
})
export class ExampleTooltipChangeComponent {
  events: string[] = [];

  // 提示框显示后
  afterOpen() {
    this.events.push('触发提示框显示后事件回调');
  }

  // 提示框消失后
  afterClosed() {
    this.events.push('触发提示框消失后事件回调');
  }

  // 提示框显示前
  beforeOpen() {
    this.events.push('触发提示框显示前事件回调');
  }

  // 提示框消失前
  beforeClosed() {
    this.events.push('触发提示框消失前事件回调');
  }

}
