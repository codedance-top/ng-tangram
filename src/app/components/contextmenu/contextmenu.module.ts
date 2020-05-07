import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextMenuDocumentComponent } from './contextmenu.component';
import { NtMarkdownModule } from '@ng-tangram/markdown';

@NgModule({
  imports: [
    CommonModule,
    NtMarkdownModule,
    RouterModule.forChild([
      { path: '', component: ContextMenuDocumentComponent }
    ])
  ],
  declarations: [ContextMenuDocumentComponent]
})
export class ContextMenuDocumentModule { }
