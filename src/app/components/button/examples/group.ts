import { Component } from '@angular/core';

@Component({
  selector: 'example-button-group',
  template: `
    <nt-button-group>
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group color="success">
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group size="small">
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group size="tiny">
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
    <nt-button-group>
      <button nt-button color="purple">按钮0</button>
      <button nt-button>按钮1</button>
      <button nt-button color="secondary">按钮2</button>
      <button nt-button color="warning">按钮3</button>
      <button nt-button color="success">按钮4</button>
      <button nt-button color="alert">按钮5</button>
    </nt-button-group>
    <nt-button-group expanded>
      <button nt-button>按钮1</button>
      <button nt-button>按钮2</button>
      <button nt-button>按钮3</button>
    </nt-button-group>
  `
})
export class ExampleButtonGroupComponent { }
