
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tooltip.component.md'
})
export class TooltipDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  changeCode = require('!!raw-loader!./examples/change').default;
  positionCode = require('!!raw-loader!./examples/position').default;
  api = require('!!raw-loader!src/libs/components/popover/README.md').default;
 }
