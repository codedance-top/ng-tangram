import { Component } from '@angular/core';
import { NtCheckboxChange } from '@ng-tangram/components/checkbox';


@Component({
  selector: 'demo-switch-circle',
  template: `
    <nt-switch size="tiny" circle></nt-switch><br>
    <nt-switch circle="true"></nt-switch><br>
    <nt-switch size="large" [circle]="circle"></nt-switch>
    <br>
    <nt-checkbox [checked]="circle" (change)="onChange($event)">设置为圆形</nt-checkbox>
  `
})
export class DemoSwitchCircleComponent {
  circle = true;

  onChange(event: NtCheckboxChange) {
    this.circle = event.checked;
  }
}
