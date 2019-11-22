
import { Component } from '@angular/core';

@Component({
  selector: 'example-picture-document',
  templateUrl: 'picture.component.md'
})
export class PictureDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  eventCode = require('!!raw-loader!./examples/event').default;
  acceptCode = require('!!raw-loader!./examples/accept').default;
  api = require('!!raw-loader!src/libs/components/picture/README.md').default;
}
