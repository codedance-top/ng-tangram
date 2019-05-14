import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';
import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-transparent',
  template: `<button nt-button (click)="openForTtemplate()">打开模态框</button>`
})
export class ExampleModalTransparentComponent {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private ntModal: NtModal) { }

  openForTtemplate() {
    let modal = this.ntModal.open(ExampleModalComponentContentComponent, {
      transparent: true,
    });
    modal.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

}
