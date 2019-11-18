import { Component } from '@angular/core';

@Component({
  templateUrl: 'drawer.component.md'
})
export class DrawerDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
}
