import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NtMarkdownBlockComponent } from './markdown-block.component';
import { NtMarkdownService } from './markdown.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [NtMarkdownBlockComponent],
  providers: [NtMarkdownService],
  exports: [NtMarkdownBlockComponent],
  entryComponents: [NtMarkdownBlockComponent]
})
export class NtMarkdownBlockModule { }
