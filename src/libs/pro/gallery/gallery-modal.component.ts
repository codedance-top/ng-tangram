import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NT_MODAL_DATA } from '@ng-tangram/components/modal';
import { Gallery } from './gallery';

@Component({
  selector: 'nt-gallery-modal',
  templateUrl: 'gallery-modal.component.html',
  styleUrls: ['gallery-modal.component.scss'],
  host: {
    class: 'gallery-modal-container nt-picture-preview'
  },
  encapsulation: ViewEncapsulation.None
})
export class NtGalleryModalComponent {

  index: number;

  images: Gallery[];

  constructor(@Inject(NT_MODAL_DATA) data: any) {
    this.index = data.index;
    this.images = data.images;
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.images.length - 1;
    }
  }

  next() {
    if (this.index < this.images.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
  }
}
