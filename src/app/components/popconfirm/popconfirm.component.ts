
import { Component } from '@angular/core';

@Component({
  selector: 'nt-popconfirm-document',
  templateUrl: 'popconfirm.component.md'
})
export class PopconfirmDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  textCode = require('!!raw-loader!./examples/text').default;
  positionCode = require('!!raw-loader!./examples/position').default;
  changeCode = require('!!raw-loader!./examples/change').default;
  api = require('!!raw-loader!libs/components/popconfirm/README.md').default;
}
