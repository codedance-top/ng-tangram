import { Component } from '@angular/core';

@Component({
  selector: 'nt-checkbox-document',
  templateUrl: 'checkbox.component.md'
})
export class CheckboxDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  disabledCode = require('!!raw-loader!./examples/disabled').default;
  allCode = require('!!raw-loader!./examples/all').default;
  changeCode = require('!!raw-loader!./examples/change').default;
}
