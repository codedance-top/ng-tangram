
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-menu-document',
  templateUrl: 'menu.component.md'
})
export class MenuDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  alignCode = require('!!raw-loader!./examples/align');
  nestedCode = require('!!raw-loader!./examples/nested');
}
