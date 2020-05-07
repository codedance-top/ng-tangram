
import { Component } from '@angular/core';

@Component({
  templateUrl: 'input.component.md'
})
export class InputDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  groupCode = require('!!raw-loader!./examples/group').default;
}
