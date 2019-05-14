import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';
import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-position',
  template: `<button nt-button (click)="openForTtemplate()">打开模态框</button>`,
})
export class ExampleModalPositionComponent {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private ntModal: NtModal) { }

  openForTtemplate() {
    let modal = this.ntModal.open(ExampleModalComponentContentComponent);
    modal.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

}
