import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer-event',
  template: `
    <button nt-button (click)="drawer.open()">打开</button>
    <nt-drawer #drawer
      class="padding-1"
      (beforeOpen)="onBeforeOpen()"
      (beforeClosed)="onBeforeClosed()"
      (afterOpen)="onAfterOpen()"
      (afterClosed)="onAfterClosed()">
      <div [innerHTML]="eventMessages"></div>
    </nt-drawer>
  `
})
export class ExampleDrawerEventComponent {

  eventMessages = '';

  count = 1;

  onBeforeOpen() {
    this.eventMessages += `第${this.count}次 beforeOpen 事件 <br>`;
  }

  onBeforeClosed() {
    this.eventMessages += `第${this.count}次 beforeClosed 事件 <br>`;
  }

  onAfterOpen() {
    this.eventMessages += `第${this.count}次 beforeOpen 事件 <br>`;
  }

  onAfterClosed() {
    this.eventMessages += `第${this.count}次 beforeOpen 事件 <br>`;
    this.count++;
  }
}
