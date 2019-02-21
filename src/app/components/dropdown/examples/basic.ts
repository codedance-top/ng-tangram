import { Component } from '@angular/core';

@Component({
  selector: 'example-dropdown-basic',
  template: `
    <a nt-dropdown position="bottom" (afterOpen)="afterOpen()">
      dropdown
      <nt-dropdown-pane arrow autosize>
        {{ content }}
      </nt-dropdown-pane>
    </a>
  `
})
export class ExampleDropdownBasicComponent {

  content = '2';

  afterOpen() {
    this.content = '下拉菜单内容下拉菜单内容下拉菜单内容下';
  }
}
