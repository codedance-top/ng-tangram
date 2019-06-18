import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';
import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-width',
  template: `<button nt-button (click)="open()">打开模态框</button>`
})
export class ExampleModalWidthComponent {

  constructor(private modal: NtModal) { }

  open() {
    this.modal.open(ExampleModalComponentContentComponent, {
      width: '600px',
      maxWidth: '800px'
    });
  }
}
