import { Component } from '@angular/core';

@Component({
  selector: 'demo-callout-event',
  template: `
    <nt-callout (onClose)="onClose()" closable>内容</nt-callout>
  `
})
export class DemoCalloutEventComponent {

  onClose() {
    // alert('被关闭了');
  }
}
