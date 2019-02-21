
import { Component } from '@angular/core';

@Component({
  selector: 'nt-tree-document',
  templateUrl: 'tree.component.md'
})
export class TreeDocumentComponent {

  asyncCode = require('!!raw-loader!./examples/async');
  checkboxCode = require('!!raw-loader!./examples/checkbox');

  flatCode = require('!!raw-loader!./examples/flat.component.ts');
  flatTemplate = require('!!raw-loader!./examples/flat.component.html');
  flatStyle = require('!!raw-loader!./examples/flat.component.scss');

  nestedCode = require('!!raw-loader!./examples/nested');
  tableCode = require('!!raw-loader!./examples/table');
 }
