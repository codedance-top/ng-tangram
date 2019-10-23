
import { Component } from '@angular/core';

@Component({
  selector: 'nt-select-document',
  templateUrl: 'select.component.md'
})
export class SelectDocumentComponent {
  api = require('!!raw-loader!src/libs/components/select/README.md');
  singleCode = require('!!raw-loader!./examples/single');
  multipleCode = require('!!raw-loader!./examples/multiple');
  disabledCode = require('!!raw-loader!./examples/disabled');
  requiredCode = require('!!raw-loader!./examples/required');
  compareWithCode = require('!!raw-loader!./examples/compareWith');
  placeholderCode = require('!!raw-loader!./examples/placeholder');
  eventCode = require('!!raw-loader!./examples/event');
  filterCode = require('!!raw-loader!./examples/filter');
  coordinatCode = require('!!raw-loader!./examples/coordinat');
}
