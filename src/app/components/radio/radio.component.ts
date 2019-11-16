import { Component } from '@angular/core';

@Component({
  selector: 'nt-radio-document',
  templateUrl: 'radio.component.md'
})
export class RadioDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  groupCode = require('!!raw-loader!./examples/group').default;
  disabledCode = require('!!raw-loader!./examples/disabled').default;
  clickCode = require('!!raw-loader!./examples/click').default;
  changeCode = require('!!raw-loader!./examples/change').default;
}
