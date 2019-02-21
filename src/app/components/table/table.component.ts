
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-table-document',
  templateUrl: 'table.component.md'
})
export class TableDocumentComponent {
  alternateCode = require('!!raw-loader!./examples/alternate');
  basicCode = require('!!raw-loader!./examples/basic');
  columnVisibilityCode = require('!!raw-loader!./examples/column-visibility');
  sortCode = require('!!raw-loader!./examples/sort');
}
