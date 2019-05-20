
## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-tooltip-basic></example-tooltip-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的用法。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-tooltip-position></example-tooltip-position>
      </nt-example-showcase>
      <nt-example-legend title="位置">位置有十二个方向。通过 `position` 设置</nt-example-legend>
      <nt-example-code [code]="positionCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-tooltip-change></example-tooltip-change>
      </nt-example-showcase>
      <nt-example-legend title="弹出层事件">可用 `afterOpen`、`afterClosed`、`beforeOpen`、`beforeClosed` 监听确认框显示前后、消失前后事件。</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<nt-markdown-block [data]="api"></nt-markdown-block> 
