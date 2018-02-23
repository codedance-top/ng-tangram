
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-modal-document',
  templateUrl: 'modal.component.md'
})
export class ModalDocumentComponent {
  basicCode = require('!!raw-loader!./demos/basic');
}
