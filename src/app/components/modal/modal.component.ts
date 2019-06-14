
import { Component } from '@angular/core';

@Component({
  selector: 'nt-modal-document',
  templateUrl: 'modal.component.md'
})
export class ModalDocumentComponent {
  api = require('!!raw-loader!src/libs/components/modal/README.md');
  basicCode = require('!!raw-loader!./examples/basic');
  eventCode = require('!!raw-loader!./examples/event');
  configCode = require('!!raw-loader!./examples/config');
  dataCode = require('!!raw-loader!./examples/data');
  widthCode = require('!!raw-loader!./examples/width');
  heightCode = require('!!raw-loader!./examples/height');
  topCode = require('!!raw-loader!./examples/top');
  closableCode = require('!!raw-loader!./examples/closable');
  hasBackdropCode = require('!!raw-loader!./examples/hasBackdrop');
  centerVerticallyCode = require('!!raw-loader!./examples/center-vertically');
  transparentCode = require('!!raw-loader!./examples/transparent');
  classCode = require('!!raw-loader!./examples/class');
}
