
import { Component } from '@angular/core';

@Component({
  selector: 'nt-tree-document',
  templateUrl: 'tree.component.md'
})
export class TreeDocumentComponent {

  asyncCode = require('!!raw-loader!./demos/async');
  checkboxCode = require('!!raw-loader!./demos/checkbox');

  flatCode = require('!!raw-loader!./demos/flat.component.ts');
  flatTemplate = require('!!raw-loader!./demos/flat.component.html');
  flatStyle = require('!!raw-loader!./demos/flat.component.scss');

  nestedCode = require('!!raw-loader!./demos/nested');
  tableCode = require('!!raw-loader!./demos/table');
 }
