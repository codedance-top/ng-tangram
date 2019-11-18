
import { Component } from '@angular/core';

@Component({
  templateUrl: 'forms.component.md'
})
export class FormsDocumentComponent {
  api = require('!!raw-loader!libs/components/forms/README.md').default;
  loginCode = require('!!raw-loader!./examples/login').default;
  inlineCode = require('!!raw-loader!./examples/inline').default;
}
