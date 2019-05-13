import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NtCheckboxChange } from '@ng-tangram/components';

@Component({
  selector: 'example-checkbox-disabled',
  template: `
    <nt-checkbox checked="true" disabled>Disabled</nt-checkbox>
  `
})
export class ExampleCheckboxDisabledComponent { }
