import { Component } from '@angular/core';

@Component({
  templateUrl: 'slider.component.md'
})
export class SliderDocumentComponent {
  api = require('!!raw-loader!src/libs/components/slider/README.md').default;

  basicCode = require('!!raw-loader!./examples/basic').default;
  minmaxCode = require('!!raw-loader!./examples/min-and-max').default;
  stepCode = require('!!raw-loader!./examples/step').default;
  stepmarkCode = require('!!raw-loader!./examples/stepmark').default;
  rangeCode = require('!!raw-loader!./examples/range').default;
  eventsCode = require('!!raw-loader!./examples/events').default;
  formsCode = require('!!raw-loader!./examples/forms').default;
  verticalCode = require('!!raw-loader!./examples/vertical').default;
}
