
import { Component } from '@angular/core';

@Component({
  templateUrl: 'label.component.md'
})
export class LabelDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  iconCode = require('!!raw-loader!./examples/icon').default;
  colorsCode = require('!!raw-loader!./examples/colors').default;
  api = require('!!raw-loader!libs/components/label/README.md').default;
}
