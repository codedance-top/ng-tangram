
import { Component } from '@angular/core';

@Component({
  selector: 'nt-tooltip-document',
  templateUrl: 'tooltip.component.md'
})
export class TooltipDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  changeCode = require('!!raw-loader!./examples/change').default;
  positionCode = require('!!raw-loader!./examples/position').default;
  api = require('!!raw-loader!libs/components/popover/README.md').default;
 }
