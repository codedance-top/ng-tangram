import { Component } from '@angular/core';

@Component({
  templateUrl: 'slider.component.md'
})
export class SliderDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
}
