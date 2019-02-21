import { Component } from '@angular/core';

@Component({
  selector: 'nt-button-document',
  templateUrl: 'button.component.md'
})
export class ButtonDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  groupCode = require('!!raw-loader!./examples/group');
}
