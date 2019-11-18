
import { Component } from '@angular/core';

@Component({
  templateUrl: 'scrim.component.md'
})
export class ScrimDocumentComponent {
  api = require('!!raw-loader!libs/components/scrim/README.md').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
}
