import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtMarkdownBlockModule } from '@ng-tangram/pro/markdown-block';

import { NtMarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  imports: [CommonModule, NtMarkdownBlockModule],
  exports: [NtMarkdownBlockModule, NtMarkdownEditorComponent],
  declarations: [NtMarkdownEditorComponent],
})
export class NtMarkdownEditorModule { }
