
import { Component } from '@angular/core';

@Component({
  selector: 'nt-input-document',
  templateUrl: 'input.component.md'
})
export class InputDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  groupCode = require('!!raw-loader!./examples/group').default;
}
