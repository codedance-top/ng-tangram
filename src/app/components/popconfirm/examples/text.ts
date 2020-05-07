import { Component } from '@angular/core';

@Component({
  selector: 'example-popconfirm-text',
  template: `
    <ng-template #title><i class="text-orange fa fa-exclamation-triangle"></i> Are you sure？</ng-template>
    <a class="button" [nt-popconfirm]="title" [confirmText]="'Yes'" [cancelText]="'No'">Delete</a>
  `,
  styles: [
    `
    .text-orange { color: orange; }
    `
  ]
})
export class ExamplePopConfirmTextComponent {

}
