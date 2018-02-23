// import { Component, ViewChild, TemplateRef } from '@angular/core';
// import { NtModal, NtModalRef } from '@ng-tangram/components/modal';

// @Component({
//   selector: 'demo-modal-component-dialog',
//   template: `
//     <h1>模态框标题</h1>
//     <p>{{ content }}</p>
//   `
// })
// export class DemoModalComponentDialogComponent {
//   content = `
//     Modal dialogs, or pop-up windows, are handy for prototyping and production.
//     Foundation includes Reveal, our jQuery modal plugin, to make this easy for you.
//   `;
// }

// @Component({
//   selector: 'demo-modal-com',
//   template: `
//     <nt-button (click)="onOpen()">弹出</nt-button>
//   `
// })
// export class DemoModalComponentComponent {
//   constructor(private ntModal: NtModal) { }

//   onOpen() {
//     this.ntModal.open(DemoModalComponentDialogComponent);
//   }
// }
