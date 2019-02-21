import { Component } from '@angular/core';

@Component({
  selector: 'nt-radio-document',
  templateUrl: 'radio.component.md'
})
export class RadioDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
