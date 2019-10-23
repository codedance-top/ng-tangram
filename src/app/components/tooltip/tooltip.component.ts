
import { Component } from '@angular/core';

@Component({
  selector: 'nt-tooltip-document',
  templateUrl: 'tooltip.component.md'
})
export class TooltipDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  changeCode = require('!!raw-loader!./examples/change');
  positionCode = require('!!raw-loader!./examples/position');
  api = require('!!raw-loader!src/libs/components/popover/README.md');
 }
