import { Component } from '@angular/core';

@Component({
  templateUrl: 'drawer.component.md'
})
export class DrawerDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  eventCode = require('!!raw-loader!./examples/event').default;
  backdropCode = require('!!raw-loader!./examples/backdrop').default;
  nestedCode = require('!!raw-loader!./examples/nested').default;
  placementCode = require('!!raw-loader!./examples/placement').default;
}
