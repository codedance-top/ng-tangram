import { Component } from '@angular/core';

@Component({
  selector: 'demo-label-colors',
  template: `
    <nt-label color="primary">primary</nt-label>
    <nt-label color="secondary">secondary</nt-label>
    <nt-label color="success">success</nt-label>
    <nt-label color="alert">alert</nt-label>
    <nt-label color="warning">warning</nt-label>
  `
})
export class DemoLabelColorsComponent { }
