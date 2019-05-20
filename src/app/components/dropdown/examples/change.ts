import { Component } from '@angular/core';

@Component({
  selector: 'example-dropdown-change',
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

    <a nt-dropdown position="bottom"
      (afterOpen)="afterOpen($event)"
      (afterClosed)="afterClosed($event)"
      (beforeOpen)="beforeOpen($event)"
      (beforeClosed)="beforeClosed($event)"
      (positionChange)="positionChange()"
    >
    下拉菜单
    <nt-dropdown-pane arrow autosize>基本下拉菜单弹出层</nt-dropdown-pane>
    </a>

  `
})
export class ExampleDropdownChangeComponent {
  events: string[] = [];

  // 弹出层显示后
  afterOpen() {
    this.events.push('触发弹出层显示后事件回调');
  }

  // 弹出层消失后
  afterClosed() {
    this.events.push('触发弹出层消失后事件回调');
  }

  // 弹出层显示前
  beforeOpen() {
    this.events.push('触发弹出层显示前事件回调');
  }

  // 弹出层消失前
  beforeClosed() {
    this.events.push('触发弹出层消失前事件回调');
  }

  // 定位策略改变
  positionChange() {
    this.events.push('定位策略改变事件回调');
  }
}
