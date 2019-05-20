
import { Component } from '@angular/core';

@Component({
  selector: 'nt-table-document',
  templateUrl: 'table.component.md'
})
export class TableDocumentComponent {
  api = require('!!raw-loader!src/libs/components/table/README.md');
  alternateCode = require('!!raw-loader!./examples/alternate');
  basicCode = require('!!raw-loader!./examples/basic');
  columnVisibilityCode = require('!!raw-loader!./examples/column-visibility');
  sortCode = require('!!raw-loader!./examples/sort');
  selectableCode = require('!!raw-loader!./examples/selectable');
}
