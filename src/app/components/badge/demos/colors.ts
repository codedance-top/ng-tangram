import { Component } from '@angular/core';

@Component({
  selector: 'demo-badge-colors',
  template: `
    <nt-badge ntColor="primary">1</nt-badge>
    <nt-badge ntColor="secondary">2</nt-badge>
    <nt-badge ntColor="success">3</nt-badge>
    <nt-badge ntColor="alert">A</nt-badge>
    <nt-badge ntColor="warning">B</nt-badge>
  `
})
export class DemoBadgeColorsComponent { }
