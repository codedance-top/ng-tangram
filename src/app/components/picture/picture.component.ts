
import { Component } from '@angular/core';

@Component({
  selector: 'example-picture-document',
  templateUrl: 'picture.component.md'
})
export class PictureDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
