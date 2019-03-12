import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { NtMarkdownModule } from '@ng-tangram/pro';

import { ExampleMarkdownBasciComponent } from './examples/basic';
import { MarkdownDocumentComponent } from './markdown.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: MarkdownDocumentComponent }
    ])
  ],
  declarations: [MarkdownDocumentComponent, ExampleMarkdownBasciComponent]
})
export class MarkdownDocumentModule { }
