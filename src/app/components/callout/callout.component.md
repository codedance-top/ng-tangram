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
        可以动态控制样式类型
      </nt-example-legend>
      <nt-example-code [code]="reactivesCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-callout-event></example-callout-event>
      </nt-example-showcase>
      <nt-example-legend title="可关闭的警告提示">
        显示关闭按钮，点击可关闭警告提示。
      </nt-example-legend>
      <nt-example-code [code]="eventCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-callout-color></example-callout-color>
      </nt-example-showcase>
      <nt-example-legend title="多种样式">
        共有5种样式 `primary`、`secondry`、`success`、`warning`、`alert`。
      </nt-example-legend>
      <nt-example-code [code]="colorCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-callout-size></example-callout-size>
      </nt-example-showcase>
      <nt-example-legend title="尺寸控制">
        共有3种尺寸 `small`、 `medium`、`large`
      </nt-example-legend>
      <nt-example-code [code]="sizeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 属性：标题 | `string` | - |
| color | 属性：颜色 | `primary`、 `secondry`、 `success`、 `warning`、 `alert` | `primary` |
| size | 属性：提示框大小 | `small`、 `medium`、`large` | `medium` |
| closable | 属性：是否显示关闭按钮 | `boolean` | - |
| close | 事件：关闭时触发 | `function` | - |
