
## 何时使用


## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-12 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-drawer-basic></example-drawer-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本设置">
        抽屉式弹出框
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-drawer-backdrop></example-drawer-backdrop>
      </nt-example-showcase>
      <nt-example-legend title="增加遮罩效果">
        通过 backdrop 属性可以增加半透明的遮罩层
      </nt-example-legend>
      <nt-example-code [code]="backdropCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-drawer-placement></example-drawer-placement>
      </nt-example-showcase>
      <nt-example-legend title="增加遮罩效果">
        通过 placement 属性可以更换弹出方向
      </nt-example-legend>
      <nt-example-code [code]="placementCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-12 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-drawer-event></example-drawer-event>
      </nt-example-showcase>
      <nt-example-legend title="事件类型">
        Drawer 组件提供 beforeOpen、beforeClosed、afterOpen、afterClosed 4个事件
      </nt-example-legend>
      <nt-example-code [code]="eventCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-drawer-nested></example-drawer-nested>
      </nt-example-showcase>
      <nt-example-legend title="限定容器">
        可以在特定的容器内使用 drawer，但是点击事件仅发生在容器内部，在容器元素上增加 nt-drawer-container 指令
      </nt-example-legend>
      <nt-example-code [code]="nestedCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API


