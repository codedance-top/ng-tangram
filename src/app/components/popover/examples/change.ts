import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-change',
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

    <a class="button" nt-popover="标题"
      (afterOpen)="afterOpen($event)"
      (afterClosed)="afterClosed($event)"
      (beforeOpen)="beforeOpen($event)"
      (beforeClosed)="beforeClosed($event)">
      Click me
      <nt-popover-pane>弹出层内容</nt-popover-pane>
    </a>
    <div class="example-events">
      <div *ngFor="let e of events">{{e}}</div>
    </div>

  `
})
export class ExamplePopoverChangeComponent {
  events: string[] = [];

  // 确认框显示后
  afterOpen() {
    this.events.push('触发确认框显示后事件回调');
  }

  // 确认框消失后
  afterClosed() {
    this.events.push('触发确认框消失后事件回调');
  }

  // 确认框显示前
  beforeOpen() {
    this.events.push('触发确认框显示前事件回调');
  }

  // 确认框消失前
  beforeClosed() {
    this.events.push('触发确认框消失前事件回调');
  }

}
