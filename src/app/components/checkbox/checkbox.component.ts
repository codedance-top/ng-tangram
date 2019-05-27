import { Component } from '@angular/core';

@Component({
  selector: 'nt-checkbox-document',
  templateUrl: 'checkbox.component.md'
})
export class CheckboxDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  disabledCode = require('!!raw-loader!./examples/disabled');
  allCode = require('!!raw-loader!./examples/all');
  changeCode = require('!!raw-loader!./examples/change');
}
