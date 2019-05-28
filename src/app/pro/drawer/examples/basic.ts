import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer',
  template: `
    <button nt-button (click)="expanded = true">请点击我</button>
    <nt-drawer [(expanded)]="expanded" size="500px" (open)="test()">
      这里是弹出框
    </nt-drawer>
  `
})
export class ExampleDrawerBasciComponent {
  expanded = false;

  test() {
    console.log(22);
  }
}
