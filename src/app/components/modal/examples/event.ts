import { Component, TemplateRef } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';

@Component({
  selector: 'example-modal-event',
  template: `
    <button nt-button (click)="open(template)">打开模态框</button>
    <ng-template #template>
      <nt-modal-header>
        模板模态框
      </nt-modal-header>
      <nt-modal-body>
        内容
      </nt-modal-body>
    </ng-template>
  `
})
export class ExampleModalEventComponent {

  constructor(private modal: NtModal) { }

  open(template: TemplateRef<any>) {
    const modal = this.modal.open(template);
    modal.afterOpen().subscribe(() => console.log('afterOpen'));
    modal.backdropClick().subscribe(() => console.log('backdropClick'));
    modal.beforeClose().subscribe(() => console.log('beforeClose'));
    modal.afterClosed().subscribe(() => console.log('afterClosed'));
    modal.keydownEvents().subscribe((event) => console.log(event));
  }
}

