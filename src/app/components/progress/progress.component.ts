
import { Component } from '@angular/core';

@Component({
  selector: 'nt-progress-document',
  templateUrl: 'progress.component.md'
})
export class ProgressDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  circleCode = require('!!raw-loader!./examples/circle').default;
  api = require('!!raw-loader!libs/components/progress/README.md').default;
}
