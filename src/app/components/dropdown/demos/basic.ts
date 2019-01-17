import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-basic',
  template: `
    <a nt-dropdown position="bottom" (afterOpen)="afterOpen()">
      dropdown
      <nt-dropdown-pane arrow autosize>
        {{ content }}
      </nt-dropdown-pane>
    </a>
  `
})
export class DemoDropdownBasicComponent {

  content = '2';

  afterOpen() {
    this.content = '下拉菜单内容下拉菜单内容下拉菜单内容下';
  }
}
