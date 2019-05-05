具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 何时使用

我们为 form 提供了以下三种排列方式：

* 水平排列：标签和表单控件水平排列；（默认）

* 垂直排列：标签和表单控件上下垂直排列；

## 代码演示
<nt-example>
  <nt-example-showcase>
    <example-form-login></example-form-login>
  </nt-example-showcase>
  <nt-example-legend title="登录框">普通的登录框。</nt-example-legend>
  <nt-example-code [code]="loginCode"></nt-example-code>
</nt-example>

<nt-example>
  <nt-example-showcase>
    <example-form-inline></example-form-inline>
  </nt-example-showcase>
  <nt-example-legend title="登录框">普通的登录框。</nt-example-legend>
  <nt-example-code [code]="inlineCode"></nt-example-code>
</nt-example>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 属性：颜色 | `primary`、 `secondry`、 `success`、 `warning`、 `alert` | `primary` |
| size | 属性：提示框大小 | `small`、 `medium`、`large` | `medium` |
| closable | 属性：是否显示关闭按钮 | `boolean` | - |
| closed | 事件：关闭时触发 | `function` | - |

