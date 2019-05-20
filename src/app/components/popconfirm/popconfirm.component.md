
点击元素，弹出气泡式的确认框。

## 何时使用

* 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。
* 和 confirm 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-popconfirm-basic></example-popconfirm-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的下拉菜单。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-popconfirm-position></example-popconfirm-position>
      </nt-example-showcase>
      <nt-example-legend title="位置">位置有十二个方向。如需箭头指向目标元素中心，通过 `position` 设置</nt-example-legend>
      <nt-example-code [code]="positionCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-popconfirm-text></example-popconfirm-text>
      </nt-example-showcase>
      <nt-example-legend title="按钮文字">通过 `confirmText` 和 `cancelText` 设置自定义按钮文字。</nt-example-legend>
      <nt-example-code [code]="textCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-popconfirm-change></example-popconfirm-change>
      </nt-example-showcase>
      <nt-example-legend title="确认框事件">可用 `afterOpen`、`afterClosed`、`beforeOpen`、`beforeClosed` 监听确认框显示前后、消失前后事件。</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
</div>


<nt-markdown-block [data]="api"></nt-markdown-block> 
