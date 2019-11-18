import { Component } from '@angular/core';

@Component({
  templateUrl: 'markdown.component.md',
})
export class MarkdownDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
}
