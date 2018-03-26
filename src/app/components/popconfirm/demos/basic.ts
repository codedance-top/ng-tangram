import { Component } from '@angular/core';

@Component({
  selector: 'demo-popconfirm-basic',
  template: `
    <a class="button"
      nt-popconfirm="确定要删除吗？"
      (ntOnConfirm)="onConfirm()"
      (ntOnCancel)="onCancel()">删除</a>
      <br>
    {{ message }}
  `
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
