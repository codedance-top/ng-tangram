
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-switch-document',
  templateUrl: 'switch.component.md'
})
export class SwitchDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  circleCode = require('!!raw-loader!./demos/circle');
 }
