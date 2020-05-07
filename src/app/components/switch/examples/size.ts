import { Component } from '@angular/core';

@Component({
  selector: 'example-switch-size',
  template: `
    <nt-switch class="tiny"></nt-switch><br>
    <nt-switch></nt-switch><br>
    <nt-switch class=large></nt-switch>
  `
})
export class ExampleSwitchSizeComponent { }
