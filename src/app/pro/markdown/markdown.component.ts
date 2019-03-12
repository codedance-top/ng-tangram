import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nt-markdown-document',
  templateUrl: 'markdown.component.md',
})
export class MarkdownDocumentComponent {
  basicCode = require('!!raw-loader!./examples/basic');
}
