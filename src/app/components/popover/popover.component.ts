
import { Component } from '@angular/core';

@Component({
  selector: 'nt-popover-document',
  templateUrl: 'popover.component.md'
})
export class PopoverDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  changeCode = require('!!raw-loader!./examples/change');
  positionCode = require('!!raw-loader!./examples/position');
  api = require('!!raw-loader!src/libs/components/popover/README.md');
}
