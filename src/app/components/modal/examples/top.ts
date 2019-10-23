import { Component } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';

import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-top',
  template: `<button nt-button (click)="open()">打开模态框</button>`,
})
export class ExampleModalTopComponent {

  constructor(private modal: NtModal) { }

  open() {
    this.modal.open(ExampleModalComponentContentComponent, {
        top: '500px'
    });
  }
}
