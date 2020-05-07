
import { Component } from '@angular/core';

@Component({
  templateUrl: 'progress.component.md'
})
export class ProgressDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  circleCode = require('!!raw-loader!./examples/circle').default;
  api = require('!!raw-loader!src/libs/components/progress/README.md').default;
}
