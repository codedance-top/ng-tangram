import { Component } from '@angular/core';

@Component({
  selector: 'example-dropdown-position',
  styles: [
  ],
  template: `

  <a nt-dropdown position="bottom">
    bottom
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="bottomLeft">
    bottomLeft
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="bottomRight">
    bottomRight
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="left">
    left
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="leftTop">
    leftTop
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="leftBottom">
    leftBottom
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="top">
    top
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="topLeft">
    topLeft
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="topRight">
    topRight
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="right">
    right
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="rightTop">
    rightTop
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a><br>

  <a nt-dropdown position="rightBottom">
    rightBottom
    <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
  </a>

  `
})
export class ExampleDropdownPositionComponent {
  events: string[] = [];

}



