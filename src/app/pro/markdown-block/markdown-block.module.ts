import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownBlockModule } from '@ng-tangram/pro';

import { ExampleMarkdownBlockComponent } from './examples/basic';
import { MarkdownBlockDocumentComponent } from './markdown-block.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownBlockModule,
    RouterModule.forChild([
      { path: '', component: MarkdownBlockDocumentComponent }
    ])
  ],
  declarations: [MarkdownBlockDocumentComponent, ExampleMarkdownBlockComponent]
})
export class MarkdownBlockDocumentModule { }
