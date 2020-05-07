## 何时使用

警告提示，展现需要关注的信息。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-callout-basic></example-callout-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本提示框">
        最简单的用法，适用于简短的警告提示。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-callout-reactives></example-callout-reactives>
      </nt-example-showcase>
      <nt-example-legend title="动态提示框">
        可以动态控制样式类型。
      </nt-example-legend>
      <nt-example-code [code]="reactivesCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-callout-event></example-callout-event>
      </nt-example-showcase>
      <nt-example-legend title="可关闭的提示框">
        显示关闭按钮，关闭后触发后提示。
      </nt-example-legend>
      <nt-example-code [code]="eventCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-callout-color></example-callout-color>
      </nt-example-showcase>
      <nt-example-legend title="样式设置">
        共有5种样式：`primary`、`secondry`、`success`、`warning`、`alert`。
      </nt-example-legend>
      <nt-example-code [code]="colorCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-callout-size></example-callout-size>
      </nt-example-showcase>
      <nt-example-legend title="尺寸设置">
        共有3种尺寸：`small`、 `medium`、`large`。
      </nt-example-legend>
      <nt-example-code [code]="sizeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>
