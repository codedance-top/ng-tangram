
import { Component } from '@angular/core';

@Component({
  selector: 'nt-scrim-document',
  templateUrl: 'scrim.component.md'
})
export class ScrimDocumentComponent {
  api = require('!!raw-loader!src/libs/components/scrim/README.md');
  basicCode = require('!!raw-loader!./examples/basic');
}
