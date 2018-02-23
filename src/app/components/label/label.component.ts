
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-label-document',
  templateUrl: 'label.component.md'
})
export class LabelDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  iconCode = require('!!raw-loader!./demos/icon');
  colorsCode = require('!!raw-loader!./demos/colors');
}
