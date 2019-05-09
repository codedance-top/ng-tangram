
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-file-document',
  templateUrl: 'file.component.md'
})
export class FileDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  eventCode = require('!!raw-loader!./examples/event');
  api = require('!!raw-loader!src/libs/components/file/README.md');
}
