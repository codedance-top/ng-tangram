import { Component } from '@angular/core';
import { NtNotifier } from '@ng-tangram/components/notifier';

@Component({
  selector: 'example-notifier-basic',
  template: `
    <button nt-button color="secondary" (click)="showNotice('default', '默认')">默认</button>
    <button nt-button (click)="showNotice('info', '提示')">提示</button>
    <button nt-button color="success" (click)="showNotice('success', '成功')">成功</button>
    <button nt-button color="warning" (click)="showNotice('warning', '警告')">警告</button>
    <button nt-button color="alert" (click)="showNotice('error', '错误')">错误</button>
  `
})
export class ExampleNotifierBasicComponent {

  constructor(private _notifier: NtNotifier) {
    console.log(_notifier);
  }

  showNotice(type: string, message: string) {
    this._notifier.notify(type, message + message + message + message  + message + message + message + message + message);
  }
}
