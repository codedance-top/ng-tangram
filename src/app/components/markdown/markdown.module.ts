import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/markdown';

import { ExampleMarkdownBlockComponent } from './examples/basic';
import { MarkdownDocumentComponent } from './markdown.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: MarkdownDocumentComponent }
    ])
  ],
  declarations: [MarkdownDocumentComponent, ExampleMarkdownBlockComponent]
})
export class MarkdownDocumentModule { }
