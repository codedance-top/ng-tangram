
import { Component } from '@angular/core';

@Component({
  templateUrl: 'autocomplete.component.md'
})
export class AutocompleteDocumentComponent {
  api = require('!!raw-loader!src/libs/components/autocomplete/README.md').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
}
