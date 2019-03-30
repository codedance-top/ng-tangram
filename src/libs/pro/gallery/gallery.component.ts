import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';

import { Gallery } from './gallery';
import { NtGalleryModalComponent } from './gallery-modal.component';

@Component({
  selector: 'nt-gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.scss'],
  host: {
    class: 'grid-x grid-margin-x grid-margin-y'
  },
  encapsulation: ViewEncapsulation.None
})
export class NtGalleryComponent {

  @Input() images: Gallery[];

  constructor(private modal: NtModal) { }

  preview(index: number) {
    this.modal.open(NtGalleryModalComponent, {
      data: { images: this.images, index },
      centerVertically: true,
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: 'auto',
      panelClass: 'overflow-visible',
      transparent: true
    });
  }
}
