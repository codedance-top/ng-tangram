
import { Component } from '@angular/core';
import { DOCS_TEMPLATE, DocsComponent } from '../docs-component';

@Component({
  selector: 'page-components',
  template: DOCS_TEMPLATE,
  styleUrls: ['../docs.scss']
})
export class ComponentsComponent extends DocsComponent { }
