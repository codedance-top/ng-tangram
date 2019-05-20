import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-position',
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

    <nt-tooltip title="{{title}}" position="topLeft">
      <a class="button">TL</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="top">
      <a class="button">top</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="topRight">
      <a class="button">TR</a>
    </nt-tooltip>
  </div>

  <div style="width: 70px; float: left;">
    <nt-tooltip title="{{title}}" position="leftTop">
      <a class="button">LT</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="left">
      <a class="button">left</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="leftBottom">
      <a class="button">LB</a>
    </nt-tooltip>
  </div>

  <div style="width: 70px; margin-left: 304px;">
    <nt-tooltip title="{{title}}" position="rightTop">
      <a class="button">RT</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="right">
      <a class="button">right</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="rightBottom">
      <a class="button">RB</a>
    </nt-tooltip>
  </div>

  <div style="margin-left: 70px; clear: both; white-space: nowrap;">
    <nt-tooltip title="{{title}}" position="bottomLeft">
      <a class="button">BL</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="bottom">
      <a class="button">bottom</a>
    </nt-tooltip>

    <nt-tooltip title="{{title}}" position="bottomRight">
      <a class="button">BR</a>
    </nt-tooltip>
  </div>

  `
})
export class ExampleTooltipPositionComponent {
  content = ' 提示框内容';
  title = '标题';

}



