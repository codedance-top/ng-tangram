import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtMarkdownModule } from '@ng-tangram/markdown';
import { NtMarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  imports: [
    CommonModule,
    NtMarkdownModule
  ],
  exports: [
    NtMarkdownModule,
    NtMarkdownEditorComponent
  ],
  declarations: [
    NtMarkdownEditorComponent
  ],
})
export class NtMarkdownEditorModule { }
