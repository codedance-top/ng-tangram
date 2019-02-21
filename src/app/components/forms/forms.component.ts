
import { Component } from '@angular/core';

@Component({
  selector: 'nt-forms-document',
  templateUrl: 'forms.component.md'
})
export class FormsDocumentComponent {
  loginCode = require('!!raw-loader!./examples/login');
  inlineCode = require('!!raw-loader!./examples/inline');
}
