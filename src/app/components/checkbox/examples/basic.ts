import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-basic',
  template: `
    <nt-checkbox checked="checked">basic</nt-checkbox>
  `
})
export class ExampleCheckboxBasicComponent {
  checked: boolean = true;
}
