import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtMarkdownComponent } from './markdown.component';
import { NtMarkdownEngine } from './markdown-engine';

@NgModule({
  imports: [CommonModule],
  providers: [NtMarkdownEngine],
  declarations: [NtMarkdownComponent],
  exports: [NtMarkdownComponent]
})
export class NtMarkdownModule { }
