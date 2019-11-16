
import { Component } from '@angular/core';

@Component({
  selector: 'nt-modal-document',
  templateUrl: 'modal.component.md'
})
export class ModalDocumentComponent {
  api = require('!!raw-loader!libs/components/modal/README.md').default;
  basicCode = require('!!raw-loader!./examples/basic').default;
  eventCode = require('!!raw-loader!./examples/event').default;
  configCode = require('!!raw-loader!./examples/config').default;
  dataCode = require('!!raw-loader!./examples/data').default;
  widthCode = require('!!raw-loader!./examples/width').default;
  heightCode = require('!!raw-loader!./examples/height').default;
  topCode = require('!!raw-loader!./examples/top').default;
  closableCode = require('!!raw-loader!./examples/closable').default;
  hasBackdropCode = require('!!raw-loader!./examples/hasBackdrop').default;
  centerVerticallyCode = require('!!raw-loader!./examples/center-vertically').default;
  transparentCode = require('!!raw-loader!./examples/transparent').default;
  classCode = require('!!raw-loader!./examples/class').default;
}
