
import { Component } from '@angular/core';

@Component({
  selector: 'nt-attachment-document',
  templateUrl: 'attachment.component.md'
})
export class AttachmentDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
  eventCode = require('!!raw-loader!./examples/event').default;
  acceptCode = require('!!raw-loader!./examples/accept').default;
  api = require('!!raw-loader!libs/components/attachment/README.md').default;
}
