import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryDocumentComponent } from './gallery.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GalleryDocumentComponent }
    ])
  ],
  declarations: [GalleryDocumentComponent]
})
export class GalleryDocumentModule { }
