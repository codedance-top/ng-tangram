
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tree.component.md'
})
export class TreeDocumentComponent {

  api = require('!!raw-loader!libs/markdown/README.md').default;

  dataCode = require('!!raw-loader!./examples/data.ts').default;

  flatCode = require('!!raw-loader!./examples/flat.component.ts').default;
  flatTemplate = require('!!raw-loader!./examples/flat.component.html').default;
  flatStyle = require('!!raw-loader!./examples/flat.component.scss').default;

  asyncCode = require('!!raw-loader!./examples/async.component.ts').default;
  asyncTemplate = require('!!raw-loader!./examples/async.component.html').default;
  asyncStyle = require('!!raw-loader!./examples/async.component.scss').default;

  checkboxCode = require('!!raw-loader!./examples/checkbox.component.ts').default;
  checkboxTemplate = require('!!raw-loader!./examples/checkbox.component.html').default;
  checkboxStyle = require('!!raw-loader!./examples/checkbox.component.scss').default;

  nestedCode = require('!!raw-loader!./examples/nested.component.ts').default;
  nestedTemplate = require('!!raw-loader!./examples/nested.component.html').default;
  nestedStyle = require('!!raw-loader!./examples/nested.component.scss').default;

  tableCode = require('!!raw-loader!./examples/table.component.ts').default;
  tableTemplate = require('!!raw-loader!./examples/table.component.html').default;
  tableStyle = require('!!raw-loader!./examples/table.component.scss').default;
 }
