import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NtMarkdownComponent } from './markdown.component';
import { NtMarkdownService } from './markdown.service';

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [NtMarkdownComponent],
  providers: [NtMarkdownService],
  exports: [NtMarkdownComponent],
  entryComponents: [NtMarkdownComponent]
})
export class NtMarkdownModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NtMarkdownModule
    };
  }
}
