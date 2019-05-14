import { Component, ViewChild, TemplateRef, ViewContainerRef, Inject } from '@angular/core';
import { NtModal, NtModalRef, NT_MODAL_DATA } from '@ng-tangram/components/modal';

import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-config',
  template: `
  <ng-container cdkPortalOutlet></ng-container>
  <button nt-button (click)="openForTtemplate()">打开模态框</button>
  `
})
export class ExampleModalConfigComponent {



  constructor(
    private ntModal: NtModal) { }

  openForTtemplate() {
    // let modal = this.ntModal.open(ExampleModalComponentContentComponent, {
    //   viewContainerRef: this.container
    // });
    // modal.afterClosed().subscribe((res) => {
    //     console.log(res);
    // });
  }

}
