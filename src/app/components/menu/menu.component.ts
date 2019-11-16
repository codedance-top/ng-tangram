
import { Component } from '@angular/core';

@Component({
  selector: 'nt-menu-document',
  templateUrl: 'menu.component.md'
})
export class MenuDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  alignCode = require('!!raw-loader!./examples/align').default;
  nestedCode = require('!!raw-loader!./examples/nested').default;
}
