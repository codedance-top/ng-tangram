import { Component } from '@angular/core';

@Component({
  selector: 'nt-button-document',
  templateUrl: 'button.component.md'
})
export class ButtonDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  groupCode = require('!!raw-loader!./examples/group').default;
}
