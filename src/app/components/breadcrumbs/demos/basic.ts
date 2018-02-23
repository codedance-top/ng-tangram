import { Component } from '@angular/core';

@Component({
  selector: 'demo-breadcrumbs-basic',
  template: `
    <ul nt-breadcrumbs>
      <li><a>Home</a></li>
      <li>Features</li>
      <li>Gene Splicing</li>
      <li class="disabled">Current</li>
    </ul>
  `
})
export class DemoBreadcrumbsBasicComponent { }
