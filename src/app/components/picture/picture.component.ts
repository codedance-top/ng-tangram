
import { Component } from '@angular/core';

@Component({
  selector: 'example-picture-document',
  templateUrl: 'picture.component.md'
})
export class PictureDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  api = require('!!raw-loader!src/libs/components/picture/README.md');
}
