import { Component, Inject} from '@angular/core';
import { NtModalRef, NT_MODAL_DATA } from '@ng-tangram/components/modal';

const content = `
Modal dialogs, or pop-up windows, are handy for prototyping and production.
Foundation includes Reveal, our jQuery modal plugin, to make this easy for you.
`;

@Component({
  selector: 'example-modal-component-content',
  template: `
    <nt-modal-header>
      组件模态框
    </nt-modal-header>
    <nt-modal-body>
      {{ content }}
    </nt-modal-body>
    <nt-modal-footer>
      <button class="button small float-right" (click)="close()">确定</button>
    </nt-modal-footer>
  `
})
export class ExampleModalComponentContentComponent {

  content: string;

  constructor(
    private ntModalRef: NtModalRef<any>,
    @Inject(NT_MODAL_DATA) data: any
  ) {
    this.content = (data && data.content) || content;
  }

  close() {
    this.ntModalRef.close('关闭');
  }
}
