import { Component } from '@angular/core';

@Component({
  selector: 'example-dropdown-trigger',
  template: `
    <a nt-dropdown position="top">
      移入触发
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a><br>

    <a nt-dropdown position="bottom"  trigger="click">
      点击触发
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a><br>
  `
})
export class ExampleDropdownTriggerComponent {
}
