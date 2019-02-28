
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-avatar-document',
  templateUrl: 'avatar.component.md'
})
export class AvatarDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  sizeCode = require('!!raw-loader!./demos/size');
  shapeCode = require('!!raw-loader!./demos/shape');
}
