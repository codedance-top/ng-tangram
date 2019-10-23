import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextMenuDocumentComponent } from './context-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ContextMenuDocumentComponent }
    ])
  ],
  declarations: [ContextMenuDocumentComponent]
})
export class ContextMenuDocumentModule { }
