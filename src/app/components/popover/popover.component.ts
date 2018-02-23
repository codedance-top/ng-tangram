
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-popover-document',
  templateUrl: 'popover.component.md'
})
export class PopoverDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
}
