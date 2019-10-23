
import { Component } from '@angular/core';

@Component({
  selector: 'nt-dropdown-document',
  templateUrl: 'dropdown.component.md'
})
export class DropdownDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  changeCode = require('!!raw-loader!./examples/change');
  triggerCode = require('!!raw-loader!./examples/trigger');
  positionCode = require('!!raw-loader!./examples/position');
  api = require('!!raw-loader!src/libs/components/dropdown/README.md');
}
