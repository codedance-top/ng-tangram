import { Component } from '@angular/core';

@Component({
  selector: 'example-popconfirm-change',
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
    <ng-template #title><i class="text-orange fa fa-exclamation-triangle"></i> Are you sure？</ng-template>
    <a class="button"
      [nt-popconfirm]="title"
      [confirmText]="'Yes'"
      [cancelText]="'No'"
      (afterOpen)="afterOpen($event)"
      (afterClosed)="afterClosed($event)"
      (beforeOpen)="beforeOpen($event)"
      (beforeClosed)="beforeClosed($event)">
      Delete
    </a>
    <div class="example-events">
      <div *ngFor="let e of events">{{e}}</div>
    </div>

  `
})
export class ExamplePopconfirmChangeComponent {
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
