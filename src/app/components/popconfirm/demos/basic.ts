import { Component } from '@angular/core';

@Component({
  selector: 'demo-popconfirm-basic',
  template: `
    <ng-template #title><nt-ant-icon class="text-orange" type="infocirlce"></nt-ant-icon> 确定要删除吗？</ng-template>
    <a class="button"
      [nt-popconfirm]="title"
      (confirm)="onConfirm()"
      (cancel)="onCancel()">删除</a>
      <br>
    {{ message }}
  `,
  styles: [
    `
    .text-orange { color: orange; }
    `
  ]
})
export class DemoPopConfirmBasciComponent {

  message = '';

  onConfirm() {
    this.message = '点击确定了';
  }
  onCancel() {
    this.message = '点击取消了';
  }
}
