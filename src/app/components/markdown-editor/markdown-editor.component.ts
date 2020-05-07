import { Component } from '@angular/core';

@Component({
  templateUrl: 'markdown-editor.component.md'
})
export class MarkdownEditorDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic').default;
}
