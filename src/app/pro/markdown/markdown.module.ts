import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownDocumentComponent } from './markdown.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MarkdownDocumentComponent }
    ])
  ],
  declarations: [MarkdownDocumentComponent]
})
export class MarkdownDocumentModule { }
