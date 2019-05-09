
import { Component } from '@angular/core';

@Component({
  selector: 'nt-tree-document',
  templateUrl: 'tree.component.md'
})
export class TreeDocumentComponent {

  api = require('!!raw-loader!src/libs/pro/markdown-block/README.md');

  flatCode = require('!!raw-loader!./examples/flat.component.ts');
  flatTemplate = require('!!raw-loader!./examples/flat.component.html');
  flatStyle = require('!!raw-loader!./examples/flat.component.scss');

  asyncCode = require('!!raw-loader!./examples/async.component.ts');
  asyncTemplate = require('!!raw-loader!./examples/async.component.html');
  asyncStyle = require('!!raw-loader!./examples/async.component.scss');

  checkboxCode = require('!!raw-loader!./examples/checkbox.component.ts');
  checkboxTemplate = require('!!raw-loader!./examples/checkbox.component.html');
  checkboxStyle = require('!!raw-loader!./examples/checkbox.component.scss');

  nestedCode = require('!!raw-loader!./examples/nested.component.ts');
  nestedTemplate = require('!!raw-loader!./examples/nested.component.html');
  nestedStyle = require('!!raw-loader!./examples/nested.component.scss');

  tableCode = require('!!raw-loader!./examples/table.component.ts');
  tableTemplate = require('!!raw-loader!./examples/table.component.html');
  tableStyle = require('!!raw-loader!./examples/table.component.scss');
 }
