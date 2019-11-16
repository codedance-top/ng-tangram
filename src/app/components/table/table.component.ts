
import { Component } from '@angular/core';

@Component({
  selector: 'nt-table-document',
  templateUrl: 'table.component.md'
})
export class TableDocumentComponent {
  api = require('!!raw-loader!libs/components/table/README.md').default;
  alternateCode = require('!!raw-loader!./examples/alternate').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
  columnVisibilityCode = require('!!raw-loader!./examples/column-visibility').default;
  sortCode = require('!!raw-loader!./examples/sort').default;
  selectableCode = require('!!raw-loader!./examples/selectable').default;
  dataCode = require('!!raw-loader!./examples/data').default;
  observableDataCode = require('!!raw-loader!./examples/observable-data').default;
}
