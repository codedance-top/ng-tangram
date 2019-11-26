import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-drawer-placement',
  template: `
    <nt-radio-group [formControl]="placement">
      <nt-radio value="left">左</nt-radio>
      <nt-radio value="right">右</nt-radio>
      <nt-radio value="top">上</nt-radio>
      <nt-radio value="bottom">下</nt-radio>
    </nt-radio-group>
    <button nt-button (click)="drawer.open()">打开</button>
    <nt-drawer #drawer class="padding-1" [placement]="placement.value">
      drawer 弹出层
    </nt-drawer>
  `
})
export class ExampleDrawerPlacementComponent {
  placement = new FormControl('left');
}
