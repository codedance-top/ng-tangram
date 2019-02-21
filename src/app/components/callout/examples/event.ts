import { Component } from '@angular/core';

@Component({
  selector: 'example-callout-event',
  template: `
    <nt-callout closable>可关闭的提示框</nt-callout>
    <nt-callout (close)="onClose()" closable>关闭会弹出提示窗口</nt-callout>
  `
})
export class ExampleCalloutEventComponent {

  onClose() {
    alert('被关闭了');
  }
}
