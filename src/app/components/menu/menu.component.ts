
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-menu-document',
  templateUrl: 'menu.component.md'
})
export class MenuDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  alignCode = require('!!raw-loader!./demos/align');
  nestedCode = require('!!raw-loader!./demos/nested');
}
