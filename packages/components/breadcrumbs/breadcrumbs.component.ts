
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[nt-breadcrumbs]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'breadcrumbs'
  }
})
export class NtBreadcrumbsComponent {
  constructor() { }
}
