import { Component, ViewEncapsulation } from '@angular/core';
import { DOCS_TEMPLATE, DocsComponent } from '../docs-component';

@Component({
  selector: 'page-pro',
  template: DOCS_TEMPLATE,
  styleUrls: ['../docs.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProComponent extends DocsComponent { }
