import { Component } from '@angular/core';

@Component({
  selector: 'nt-radio-document',
  templateUrl: 'radio.component.md'
})
export class RadioDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  groupCode = require('!!raw-loader!./examples/group');
  disabledCode = require('!!raw-loader!./examples/disabled');
  clickCode = require('!!raw-loader!./examples/click');
  changeCode = require('!!raw-loader!./examples/change');
}
