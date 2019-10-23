
import { Component } from '@angular/core';

@Component({
  selector: 'nt-badge-document',
  templateUrl: 'badge.component.md'
})
export class BadgeDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  iconCode = require('!!raw-loader!./examples/icon');
  colorsCode = require('!!raw-loader!./examples/colors');
}
