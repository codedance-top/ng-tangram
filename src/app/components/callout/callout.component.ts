import { Component } from '@angular/core';

@Component({
  templateUrl: 'callout.component.md'
})
export class CalloutDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  colorCode = require('!!raw-loader!./examples/color').default;
  reactivesCode = require('!!raw-loader!./examples/reactives').default;
  sizeCode = require('!!raw-loader!./examples/size').default;
  eventCode = require('!!raw-loader!./examples/event').default;
  api = require('!!raw-loader!libs/components/callout/README.md').default;
}
