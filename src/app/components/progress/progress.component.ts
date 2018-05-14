
import { Component } from '@angular/core';

@Component({
  selector: 'nt-progress-document',
  templateUrl: 'progress.component.md'
})
export class ProgressDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  circleCode = require('!!raw-loader!./demos/circle');
}
