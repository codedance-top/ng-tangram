import { Component } from '@angular/core';

@Component({
  selector: 'example-switch-disabled',
  template: `
    <nt-switch></nt-switch><br>
    <nt-switch disabled="true"></nt-switch>
  `
})
export class ExampleSwitchDisabledComponent { }
