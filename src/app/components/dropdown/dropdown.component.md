
向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-dropdown-basic></example-dropdown-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的下拉菜单。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-dropdown-position></example-dropdown-position>
      </nt-example-showcase>
      <nt-example-legend title="弹出位置">支持12个弹出位置</nt-example-legend>
      <nt-example-code [code]="positionCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-dropdown-trigger></example-dropdown-trigger>
      </nt-example-showcase>
      <nt-example-legend title="触发方式">默认是移入触发弹出，可以点击触发。</nt-example-legend>
      <nt-example-code [code]="triggerCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-dropdown-change></example-dropdown-change>
      </nt-example-showcase>
      <nt-example-legend title="弹出层事件">可用 `afterOpen`、`afterClosed`、`beforeOpen`、`beforeClosed` 监听弹出层显示前后、消失前后事件。</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div> 
