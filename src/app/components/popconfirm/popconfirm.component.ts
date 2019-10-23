
import { Component } from '@angular/core';

@Component({
  selector: 'nt-popconfirm-document',
  templateUrl: 'popconfirm.component.md'
})
export class PopconfirmDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  textCode = require('!!raw-loader!./examples/text');
  positionCode = require('!!raw-loader!./examples/position');
  changeCode = require('!!raw-loader!./examples/change');
  api = require('!!raw-loader!src/libs/components/popconfirm/README.md');
}
