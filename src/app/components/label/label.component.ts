
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-label-document',
  templateUrl: 'label.component.md'
})
export class LabelDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  iconCode = require('!!raw-loader!./examples/icon');
  colorsCode = require('!!raw-loader!./examples/colors');
}
