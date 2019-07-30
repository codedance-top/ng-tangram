import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtMarkdownBlockComponent } from './markdown-block.component';
import { NtMarkdownService } from './markdown.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NtMarkdownBlockComponent],
  providers: [NtMarkdownService],
  exports: [NtMarkdownBlockComponent],
  entryComponents: [NtMarkdownBlockComponent]
})
export class NtMarkdownBlockModule { }
