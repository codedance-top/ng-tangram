import { Component } from '@angular/core';

@Component({
  selector: 'demo-label-colors',
  template: `
    <nt-label ntColor="primary">primary</nt-label>
    <nt-label ntColor="secondary">secondary</nt-label>
    <nt-label ntColor="success">success</nt-label>
    <nt-label ntColor="alert">alert</nt-label>
    <nt-label ntColor="warning">warning</nt-label>
  `
})
export class DemoLabelColorsComponent { }
