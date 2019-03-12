import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'example-switch-basic',
  template: `
    <nt-switch class="tiny" disabled></nt-switch><br>
    <nt-switch></nt-switch><br>
    <nt-switch class="large"></nt-switch>
  `
})
export class ExampleSwitchBasciComponent { }
