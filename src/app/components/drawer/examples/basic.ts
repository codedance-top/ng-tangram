import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer-basic',
  template: `
    <button nt-button (click)="drawer.open()">打开</button>
    <nt-drawer #drawer class="padding-1">
      drawer 弹出层
    </nt-drawer>
  `
})
export class ExampleDrawerBasicComponent { }
