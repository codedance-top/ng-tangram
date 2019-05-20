import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NtModal, NtModalRef } from '@ng-tangram/components/modal';

@Component({
  selector: 'example-modal-event',
  template: `
    <button nt-button (click)="openForTtemplate()">打开模态框</button>
    <ng-template>
      <nt-modal-header>
        模板模态框
      </nt-modal-header>
      <nt-modal-body>
          Modal dialogs, or pop-up windows, are handy for prototyping and production.
        Foundation includes Reveal, our jQuery modal plugin, to make this easy for you.
      </nt-modal-body>
    </ng-template>
  `
})
export class ExampleModalEventComponent {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private ntModal: NtModal) { }

  openForTtemplate() {
    let modal = this.ntModal.open(this.template);
    modal.afterOpen().subscribe(() => console.log('afterOpen'));
    modal.backdropClick().subscribe(() => console.log('backdropClick'));
    modal.beforeClose().subscribe(() => console.log('beforeClose'));
    modal.afterClosed().subscribe(() => console.log('afterClosed'));
    modal.keydownEvents().subscribe((event) => console.log(event));
  }
}

