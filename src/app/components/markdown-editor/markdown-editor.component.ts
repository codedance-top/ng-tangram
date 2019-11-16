import { Component } from '@angular/core';

@Component({
  selector: 'nt-markdown-editor-document',
  templateUrl: 'markdown-editor.component.md'
})
export class MarkdownEditorDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
}
