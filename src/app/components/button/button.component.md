# 按钮 Button

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-button-basic></example-button-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">
        最简单的用法，适用于简短的警告提示。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
   
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-button-group></example-button-group>
      </nt-example-showcase>
      <nt-example-legend title="按钮组">
        多个按钮
      </nt-example-legend>
      <nt-example-code [code]="groupCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 属性：颜色 | `primary`、 `secondry`、 `success`、 `warning`、 `alert` | `primary` |
| size | 属性：提示框大小 | `small`、 `medium`、`large` | `medium` |
| closable | 属性：是否显示关闭按钮 | `boolean` | - |
| closed | 事件：关闭时触发 | `function` | - |

