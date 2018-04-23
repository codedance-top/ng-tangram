
import { Component } from '@angular/core';

@Component({
  selector: 'demo-picture-document',
  templateUrl: 'picture.component.md'
})
export class PictureDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
}
