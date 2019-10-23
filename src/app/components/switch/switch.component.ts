
import { Component } from '@angular/core';

@Component({
  selector: 'nt-switch-document',
  templateUrl: 'switch.component.md'
})
export class SwitchDocumentComponent {
  api = require('!!raw-loader!src/libs/components/switch/README.md');
  basicCode = require('!!raw-loader!./examples/basic');
  circleCode = require('!!raw-loader!./examples/circle');
  sizeCode = require('!!raw-loader!./examples/size');
  disabledCode = require('!!raw-loader!./examples/disabled');
  checkedCode = require('!!raw-loader!./examples/checked');
  changeCode = require('!!raw-loader!./examples/change');
 }
