import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NtModal, NtModalRef } from '@ng-tangram/components/modal';

const content = `
Modal dialogs, or pop-up windows, are handy for prototyping and production.
Foundation includes Reveal, our jQuery modal plugin, to make this easy for you.
`;

@Component({
  selector: 'demo-modal-component-dialog',
  template: `
    <h1>组件模态框</h1>
    <p>{{ content }}</p>
  `
})
export class DemoModalComponentDialogComponent {
  content = content;
}

@Component({
  selector: 'demo-modal-basic',
  template: `
    <button nt-button (click)="openForTtemplate()">模板模态框</button>
    <button nt-button (click)="openForComponent()">组件模态框</button>
    <ng-template>
      <h1>模板模态框</h1>
      <p>{{ content }}</p>
    </ng-template>
  `
})
export class DemoModalBasicComponent {

  @ViewChild(TemplateRef) template : TemplateRef<any>;
  content = content;

  constructor(private ntModal: NtModal) { }

  openForTtemplate() {
    this.ntModal.open(this.template);
  }

  openForComponent() {
    const modal = this.ntModal.open(DemoModalComponentDialogComponent);
  }
}
