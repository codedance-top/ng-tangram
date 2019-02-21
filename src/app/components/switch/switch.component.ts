
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-switch-document',
  templateUrl: 'switch.component.md'
})
export class SwitchDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
  circleCode = require('!!raw-loader!./examples/circle');
 }
