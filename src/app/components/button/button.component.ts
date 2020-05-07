import { Component } from '@angular/core';

@Component({
  templateUrl: 'button.component.md'
})
export class ButtonDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  groupCode = require('!!raw-loader!./examples/group').default;
}
