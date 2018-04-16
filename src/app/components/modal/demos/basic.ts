import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NtModal, NtModalRef } from '@ng-tangram/components/modal';

const content = `
Modal dialogs, or pop-up windows, are handy for prototyping and production.
Foundation includes Reveal, our jQuery modal plugin, to make this easy for you.
`;

@Component({
  selector: 'demo-modal-component-dialog',
  template: `
    <nt-modal-header>
      组件模态框
    </nt-modal-header>
    <nt-modal-body>
      {{ content }}
    </nt-modal-body>
    <nt-modal-footer>
      <button class="button small float-right">确定</button>
    </nt-modal-footer>
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
      <nt-modal-header>
      模板模态框
      </nt-modal-header>
      <nt-modal-body>
        {{ content }}
      </nt-modal-body>
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
