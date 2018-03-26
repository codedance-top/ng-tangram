import { Component } from '@angular/core';

@Component({
  selector: 'demo-button-group',
  template: `
    <nt-button-group>
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group ntColor="success">
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group ntSize="small">
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group ntSize="tiny">
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group>
      <button nt-button ntColor="purple">按钮0</button>
      <button nt-button>按钮1</button>
      <button nt-button ntColor="secondary">按钮2</button>
      <button nt-button ntColor="warning">按钮3</button>
      <button nt-button ntColor="success">按钮4</button>
      <button nt-button ntColor="alert">按钮5</button>
    </nt-button-group>
    <nt-button-group ntExpanded>
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
  `
})
export class DemoButtonGroupComponent { }
