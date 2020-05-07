
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NtMarkdownComponent } from './markdown.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NtMarkdownComponent],
  exports: [NtMarkdownComponent]
})
export class NtMarkdownModule { }
