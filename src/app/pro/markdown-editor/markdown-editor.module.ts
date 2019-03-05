import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownEditorModule } from '@ng-tangram/pro';

import { MarkdownEditorDocumentComponent } from './markdown-editor.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownEditorModule,
    RouterModule.forChild([
      { path: '', component: MarkdownEditorDocumentComponent }
    ])
  ],
  declarations: [MarkdownEditorDocumentComponent]
})
export class MarkdownEditorDocumentModule { }
