import { Component } from '@angular/core';

@Component({
  selector: 'example-dropdown-basic',
  template: `
    <a nt-dropdown position="top">
      基本下拉菜单
      <nt-dropdown-pane arrow autosize>{{content}}</nt-dropdown-pane>
    </a>
  `
})
export class ExampleDropdownBasicComponent {
    content = '基本下拉菜单弹出层';
}
