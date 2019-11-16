
import { Component } from '@angular/core';

@Component({
  selector: 'nt-badge-document',
  templateUrl: 'badge.component.md'
})
export class BadgeDocumentComponent {
  api = require('!!raw-loader!libs/components/badge/README.md').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
  iconCode = require('!!raw-loader!./examples/icon').default;
  colorsCode = require('!!raw-loader!./examples/colors').default;
}
