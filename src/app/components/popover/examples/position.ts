import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-position',
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

    <a class="top-left" class="button" nt-popover="{{title}}" position="topLeft"> TL
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="top" class="button" nt-popover="{{title}}" position="top"> top
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="top-right" class="button" nt-popover="{{title}}" position="topRight"> TR
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>
  </div>

  <div style="width: 70px; float: left;">
    <a class="left-top" class="button" nt-popover="{{title}}" position="leftTop"> LT
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="left" class="button" nt-popover="{{title}}" position="left"> left
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="left-bottom" class="button" nt-popover="{{title}}" position="leftBottom"> LB
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>
  </div>

  <div style="width: 70px; margin-left: 304px;">
    <a class="right-top" class="button" nt-popover="{{title}}" position="rightTop"> RT
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="right" class="button" nt-popover="{{title}}" position="right"> right
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="right-bottom" class="button" nt-popover="{{title}}" position="rightBottom"> RB
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>
  </div>

  <div style="margin-left: 70px; clear: both; white-space: nowrap;">
    <a class="bottom-left" class="button" nt-popover="{{title}}" position="bottomLeft"> BL
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="bottom" class="button" nt-popover="{{title}}" position="bottom"> bottom
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>

    <a class="bottom-right" class="button" nt-popover="{{title}}" position="bottomRight"> BR
      <nt-popover-pane>{{content}}</nt-popover-pane>
    </a>
  </div>

  `
})
export class ExamplePopoverPositionComponent {
  content = '弹出框内容';
  title = '标题';

}



