import { Component } from '@angular/core';

@Component({
  selector: 'nt-markdown-block-document',
  templateUrl: 'markdown-block.component.md',
})
export class MarkdownBlockDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
