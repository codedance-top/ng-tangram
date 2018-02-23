
import { Component } from '@angular/core';

@Component({
  selector: 'demo-checkbox-basic',
  template: `
    <nt-checkbox>复选框</nt-checkbox>
    <nt-checkbox ntColor="primary" disabled>复选框</nt-checkbox>
    <nt-checkbox ntColor="success">复选框</nt-checkbox>
    <nt-checkbox ntColor="warning">复选框</nt-checkbox>
    <nt-checkbox ntColor="alert">复选框</nt-checkbox>
  `
})
export class DemoCheckboxBasicComponent { }
