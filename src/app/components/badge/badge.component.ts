
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-badge-document',
  templateUrl: 'badge.component.md'
})
export class BadgeDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  iconCode = require('!!raw-loader!./demos/icon');
  colorsCode = require('!!raw-loader!./demos/colors');
}
