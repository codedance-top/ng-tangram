import { Component } from '@angular/core';

@Component({
  templateUrl: 'notifier.component.md'
})
export class NotifierDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  groupCode = require('!!raw-loader!./examples/group').default;
}
