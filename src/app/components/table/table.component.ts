
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-table-document',
  templateUrl: 'table.component.md'
})
export class TableDocumentComponent {
  alternateCode = require('!!raw-loader!./demos/alternate');
  basicCode = require('!!raw-loader!./demos/basic');
  columnVisibilityCode = require('!!raw-loader!./demos/column-visibility');
  sortCode = require('!!raw-loader!./demos/sort');
}
