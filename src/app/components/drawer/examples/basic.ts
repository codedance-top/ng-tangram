import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer',
  template: `
    <button nt-button (click)="opened = true">请点击我</button>
    <nt-drawer [(opened)]="opened">
      这里是弹出框
    </nt-drawer>
  `
})
export class ExampleDrawerBasciComponent {
  opened = false;
}
