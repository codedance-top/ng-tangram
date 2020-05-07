import { Component, Inject } from '@angular/core';
import { NT_MODAL_DATA, NtModal, NtModalRef } from '@ng-tangram/components/modal';

@Component({
  selector: 'example-modal-component-dialog',
  template: `
    <nt-modal-header>
      组件模态框
    </nt-modal-header>
    <nt-modal-body>
     <p>次数：{{ count }}</p>
    </nt-modal-body>
    <nt-modal-footer>
      <button class="button small float-right">确定</button>
    </nt-modal-footer>
  `
})
export class ExampleModalComponentDataComponent {
  public count: number;
  constructor(
    private ntModalRef: NtModalRef<any>,
    @Inject(NT_MODAL_DATA) data: any
  ) {
    this.count = data.count || 0;
  }

  close() {
    this.ntModalRef.close('关闭');
  }
}

@Component({
  selector: 'example-modal-data',
  template: `
    <button class="button" (click)="onOpen()">打开模态框</button>
  `
})
export class ExampleModalDataComponent {

  constructor(private ntModal: NtModal) {}
  onOpen() {

    let modal: NtModalRef <ExampleModalComponentDataComponent> = this.ntModal.open(ExampleModalComponentDataComponent , {
      data: {
        count: 0
      }
    });

    modal.afterOpen().subscribe(() => {
      let count = 1;
      let timer: any =  setInterval(() => {
        if (count === 10) {
          clearInterval(timer);
        }
        modal.componentInstance.count = count ++;
      }, 1000);
    });
  }
}
