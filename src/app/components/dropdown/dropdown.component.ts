
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-dropdown-document',
  templateUrl: 'dropdown.component.md'
})
export class DropdownDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
