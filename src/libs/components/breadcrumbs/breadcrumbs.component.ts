import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[nt-breadcrumbs]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'breadcrumbs'
  }
})
export class NtBreadcrumbsComponent { }
