import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NtMarkdownBlockComponent } from './markdown-block.component';
import { NtMarkdownService } from './markdown.service';

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [NtMarkdownBlockComponent],
  providers: [NtMarkdownService],
  exports: [NtMarkdownBlockComponent],
  entryComponents: [NtMarkdownBlockComponent]
})
export class NtMarkdownBlockModule { }
