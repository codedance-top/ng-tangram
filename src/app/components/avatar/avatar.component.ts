
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-avatar-document',
  templateUrl: 'avatar.component.md'
})
export class AvatarDocumentComponent {
  api = require('!!raw-loader!src/libs/components/avatar/README.md');
  basicCode = require('!!raw-loader!./examples/basic');
  sizeCode = require('!!raw-loader!./examples/size');
  shapeCode = require('!!raw-loader!./examples/shape');
}
