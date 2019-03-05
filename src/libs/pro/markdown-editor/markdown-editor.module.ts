import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtMarkdownModule } from '@ng-tangram/pro/markdown';

import { NtMarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  imports: [CommonModule, NtMarkdownModule],
  exports: [NtMarkdownEditorComponent],
  declarations: [NtMarkdownEditorComponent],
})
export class NtMarkdownEditorModule { }
