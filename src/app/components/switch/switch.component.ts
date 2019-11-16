
import { Component } from '@angular/core';

@Component({
  selector: 'nt-switch-document',
  templateUrl: 'switch.component.md'
})
export class SwitchDocumentComponent {
  api = require('!!raw-loader!libs/components/switch/README.md').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
  circleCode = require('!!raw-loader!./examples/circle').default;
  sizeCode = require('!!raw-loader!./examples/size').default;
  disabledCode = require('!!raw-loader!./examples/disabled').default;
  checkedCode = require('!!raw-loader!./examples/checked').default;
  changeCode = require('!!raw-loader!./examples/change').default;
 }
