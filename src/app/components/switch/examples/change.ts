import { Component } from '@angular/core';

@Component({
  selector: 'example-switch-change',
  template: `
    <nt-switch (change)="change($event)"></nt-switch>
    <p>{{checked ? '选中' : '未选中'}} 状态</p>
  `
})
export class ExampleSwitchChangeComponent {

      checked: boolean = false;

      change($event) {
        this.checked = $event.checked;
      }

 }
