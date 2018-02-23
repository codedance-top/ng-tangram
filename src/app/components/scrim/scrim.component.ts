
import { Component } from '@angular/core';

@Component({
  selector: 'nt-scrim-document',
  templateUrl: 'scrim.component.md'
})
export class ScrimDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
}
