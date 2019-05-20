import { Component } from '@angular/core';

@Component({
  selector: 'example-dropdown-position',
  styles: [
    `
    .text-orange { color: orange; }
    .demo { overflow: auto; }

    .button {
      margin-right: 8px;
      margin-bottom: 8px;
      width: 70px;
      text-align: center;
    }

    div {
      display: block;
    }
    `
  ],
  template: `

  <div style="margin-left: 70px; white-space: nowrap;">
    <a nt-dropdown class="button" position="topLeft"> TL
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="top"> top
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="topRight"> TR
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>
  </div>

  <div style="width: 70px; float: left;">
    <a nt-dropdown class="button" position="leftTop"> LT
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="left"> left
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="leftBottom"> LB
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>
  </div>

  <div style="width: 70px; margin-left: 304px;">
    <a nt-dropdown class="button" position="rightTop"> RT
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="right"> right
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="rightBottom"> RB
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>
  </div>

  <div style="margin-left: 70px; clear: both; white-space: nowrap;">
    <a nt-dropdown class="button" position="bottomLeft"> BL
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="bottom"> bottom
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>

    <a nt-dropdown class="button" position="bottomRight"> BR
      <nt-dropdown-pane arrow autosize>弹出层</nt-dropdown-pane>
    </a>
  </div>

  `
})
export class ExampleDropdownPositionComponent {
  events: string[] = [];

}



