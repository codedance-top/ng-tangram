import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NtCheckboxChange } from '@ng-tangram/components';

@Component({
  selector: 'example-checkbox-change',
  template: `
    <nt-checkbox (change)="_change($event)">change</nt-checkbox>
  `
})
export class ExampleCheckboxChangeComponent {

  _change(event: Event) {
    console.log(event);
  }
}
