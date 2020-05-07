
import { Component } from '@angular/core';

@Component({
  templateUrl: 'select.component.md'
})
export class SelectDocumentComponent {
  api = require('!!raw-loader!src/libs/components/select/README.md').default;
  singleCode = require('!!raw-loader!./examples/single').default;
  multipleCode = require('!!raw-loader!./examples/multiple').default;
  disabledCode = require('!!raw-loader!./examples/disabled').default;
  requiredCode = require('!!raw-loader!./examples/required').default;
  compareWithCode = require('!!raw-loader!./examples/compareWith').default;
  placeholderCode = require('!!raw-loader!./examples/placeholder').default;
  eventCode = require('!!raw-loader!./examples/event').default;
  filterCode = require('!!raw-loader!./examples/filter').default;
  coordinatCode = require('!!raw-loader!./examples/coordinat').default;
}
