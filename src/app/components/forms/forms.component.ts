
import { Component } from '@angular/core';

@Component({
  selector: 'nt-forms-document',
  templateUrl: 'forms.component.md'
})
export class FormsDocumentComponent {
  api = require('!!raw-loader!src/libs/components/forms/README.md');
  loginCode = require('!!raw-loader!./examples/login');
  inlineCode = require('!!raw-loader!./examples/inline');
}
