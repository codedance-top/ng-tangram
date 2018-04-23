
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-file-document',
  templateUrl: 'file.component.md'
})
export class FileDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
}
