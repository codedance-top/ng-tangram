
## 何时使用
当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。  
  
和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-popover-basic></example-popover-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最基本的用法，浮层的大小由内容区域决定。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-popover-position></example-popover-position>
      </nt-example-showcase>
      <nt-example-legend title="位置">位置有十二个方向。通过 `position` 设置</nt-example-legend>
      <nt-example-code [code]="positionCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-popover-change></example-popover-change>
      </nt-example-showcase>
      <nt-example-legend title="弹出层事件">可用 `afterOpen`、`afterClosed`、`beforeOpen`、`beforeClosed` 监听确认框显示前后、消失前后事件。</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<nt-markdown-block [data]="api"></nt-markdown-block> 
