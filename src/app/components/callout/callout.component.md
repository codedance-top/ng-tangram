# 提示框 Callout

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-callout-basic></demo-callout-basic>
      </nt-example-showcase>
      <nt-example-legend ntTitle="基本提示框">
        最简单的用法，适用于简短的警告提示。
      </nt-example-legend>
      <nt-example-code [ntCode]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <demo-callout-reactives></demo-callout-reactives>
      </nt-example-showcase>
      <nt-example-legend ntTitle="动态提示框">
        可以动态控制样式类型
      </nt-example-legend>
      <nt-example-code [ntCode]="reactivesCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <demo-callout-event></demo-callout-event>
      </nt-example-showcase>
      <nt-example-legend ntTitle="可关闭的警告提示">
        显示关闭按钮，点击可关闭警告提示。
      </nt-example-legend>
      <nt-example-code [ntCode]="eventCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-callout-color></demo-callout-color>
      </nt-example-showcase>
      <nt-example-legend ntTitle="多种样式">
        共有5种样式 `primary`、`secondry`、`success`、`warning`、`alert`。
      </nt-example-legend>
      <nt-example-code [ntCode]="colorCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <demo-callout-size></demo-callout-size>
      </nt-example-showcase>
      <nt-example-legend ntTitle="尺寸控制">
        共有3种尺寸 `small`、 `medium`、`large`
      </nt-example-legend>
      <nt-example-code [ntCode]="sizeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ntColor | 属性：颜色 | `primary`、 `secondry`、 `success`、 `warning`、 `alert` | `primary` |
| ntSize | 属性：提示框大小 | `small`、 `medium`、`large` | `medium` |
| ntClosable | 属性：是否显示关闭按钮 | `boolean` | - |
| ntOnClose | 事件：关闭时触发 | `function` | - |

