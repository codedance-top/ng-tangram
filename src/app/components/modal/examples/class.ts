import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { NtModal } from '@ng-tangram/components/modal';
import { ExampleModalComponentContentComponent } from '../examples/content';

@Component({
  selector: 'example-modal-class',
  template: `<button nt-button (click)="openForTtemplate()">打开模态框</button>`,
  styleUrls: ['./class.scss']
})
export class ExampleModalClassComponent {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private ntModal: NtModal) { }

  openForTtemplate() {
    let modal = this.ntModal.open(ExampleModalComponentContentComponent, {
      panelClass: 'new-panel-class',
      backdropClass: 'new-backdrop-class'
    });
    modal.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

}
