
import { Component } from '@angular/core';

@Component({
  selector: 'demo-checkbox-basic',
  template: `
    <nt-checkbox>复选框</nt-checkbox>
    <nt-checkbox color="primary" disabled>复选框</nt-checkbox>
    <nt-checkbox color="success">复选框</nt-checkbox>
    <nt-checkbox color="warning">复选框</nt-checkbox>
    <nt-checkbox color="alert">复选框</nt-checkbox>
  `
})
export class DemoCheckboxBasicComponent { }
