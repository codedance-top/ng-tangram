
import { Component } from '@angular/core';

@Component({
  selector: 'nt-label-document',
  templateUrl: 'label.component.md'
})
export class LabelDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  iconCode = require('!!raw-loader!./examples/icon');
  colorsCode = require('!!raw-loader!./examples/colors');
  api = require('!!raw-loader!src/libs/components/label/README.md');
}
