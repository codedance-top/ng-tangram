
import { Component } from '@angular/core';

@Component({
  selector: 'nt-progress-document',
  templateUrl: 'progress.component.md'
})
export class ProgressDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  circleCode = require('!!raw-loader!./examples/circle');
  api = require('!!raw-loader!src/libs/components/progress/README.md');
}
