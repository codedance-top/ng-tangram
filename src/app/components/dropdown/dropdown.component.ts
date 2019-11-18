
import { Component } from '@angular/core';

@Component({
  templateUrl: 'dropdown.component.md'
})
export class DropdownDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  changeCode = require('!!raw-loader!./examples/change').default;
  triggerCode = require('!!raw-loader!./examples/trigger').default;
  positionCode = require('!!raw-loader!./examples/position').default;
  api = require('!!raw-loader!libs/components/dropdown/README.md').default;
}
