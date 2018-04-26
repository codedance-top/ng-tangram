import { Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown-basic',
  template: `
    <a nt-dropdown>
      dropdown
      <nt-dropdown-pane arrow>
        下拉菜单内容
      </nt-dropdown-pane>
    </a>
  `
})
export class DemoDropdownBasicComponent { }
