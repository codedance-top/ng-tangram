import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuDocumentComponent } from './context-menu.component';
import { RouterModule } from '@angular/router';

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
