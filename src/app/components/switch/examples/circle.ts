import { Component } from '@angular/core';

@Component({
  selector: 'example-switch-circle',
  template: `
    <nt-switch class="tiny" circle></nt-switch><br>
    <nt-switch circle="true"></nt-switch><br>
    <nt-switch class="large" circle="true"></nt-switch>
  `
})
export class ExampleSwitchCircleComponent { }
