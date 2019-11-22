
import { Component } from '@angular/core';

@Component({
  templateUrl: 'popconfirm.component.md'
})
export class PopconfirmDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  textCode = require('!!raw-loader!./examples/text').default;
  positionCode = require('!!raw-loader!./examples/position').default;
  changeCode = require('!!raw-loader!./examples/change').default;
  api = require('!!raw-loader!src/libs/components/popconfirm/README.md').default;
}
