
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-breadcrumbs-document',
  templateUrl: 'breadcrumbs.component.md'
})
export class BreadcrumbsDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
