import { Component } from '@angular/core';

@Component({
  selector: 'example-input-group',
  template: `
  <nt-input-group>
    <nt-input-addon>https://</nt-input-addon>
    <input ntInput type="text"/>
    <nt-input-addon>.com</nt-input-addon>
  </nt-input-group>
  <nt-input-group transparent="true">
    <nt-input-addon>https://</nt-input-addon>
    <input ntInput type="text"/>
    <nt-input-addon>.com</nt-input-addon>
  </nt-input-group>
  `
})
export class ExampleInputGroupComponent { }
