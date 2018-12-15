import { Component } from '@angular/core';

@Component({
  selector: 'demo-switch-circle',
  template: `
    <nt-switch size="tiny" circle></nt-switch><br>
    <nt-switch circle="true"></nt-switch><br>
    <nt-switch size="large" circle="false"></nt-switch>
  `
})
export class DemoSwitchCircleComponent { }
