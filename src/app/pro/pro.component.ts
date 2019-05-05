import { Component } from '@angular/core';
import { DOCS_TEMPLATE, DocsComponent } from '../docs-component';

@Component({
  selector: 'page-pro',
  template: DOCS_TEMPLATE,
  styleUrls: ['../docs.scss']
})
export class ProComponent extends DocsComponent { }
