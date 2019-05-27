import { Component } from '@angular/core';

@Component({
  selector: 'example-radio-basic',
  template: `
    <nt-radio value="checked" [checked]="checked">checked</nt-radio>
  `
})
export class ExampleRadioBasicComponent {

  checked: boolean = true;

  constructor() {

  }
}
