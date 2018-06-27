import { Component } from '@angular/core';

@Component({
  selector: 'nt-checkbox-document',
  templateUrl: 'checkbox.component.md'
})
export class CheckboxDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
}
