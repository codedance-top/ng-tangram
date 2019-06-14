import { Component, ViewContainerRef } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';
import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-class',
  template: `
    <button nt-button (click)="open()">打开模态框</button>
  `,
  styles: [`
    .new-backdrop-class {
      background-color: rgba(255,255,255,.9);
      color: #f00;
    }
  `]
})
export class ExampleModalClassComponent {

  constructor(private ntModal: NtModal) { }

  open() {
    this.ntModal.open(ExampleModalComponentContentComponent, {
      panelClass: 'new-panel-class',
      backdropClass: 'new-backdrop-class'
    });
  }
}
