
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-table-document',
  templateUrl: 'table.component.md'
})
export class TableDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
  sortCode = require('!!raw-loader!./demos/sort');
}
