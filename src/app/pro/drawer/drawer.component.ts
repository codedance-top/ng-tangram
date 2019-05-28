import { Component } from '@angular/core';

@Component({
  selector: 'nt-drawer-document',
  templateUrl: 'drawer.component.md'
})
export class DrawerDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
