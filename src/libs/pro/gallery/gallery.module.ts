import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtModalModule } from '@ng-tangram/components';

import { NtGalleryModalComponent } from './gallery-modal.component';
import { NtGalleryComponent } from './gallery.component';

@NgModule({
  imports: [
    CommonModule,
    NtModalModule
  ],
  exports: [NtGalleryComponent, NtGalleryModalComponent],
  entryComponents: [NtGalleryModalComponent],
  declarations: [NtGalleryComponent, NtGalleryModalComponent]
})
export class NtGalleryModule { }
