
# Avatar 头像

## 何时使用

  显示用户头像

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-avatar-basic></demo-avatar-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">
        最简单的用法，展示用户头像。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
</div>


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 属性：头像大小 | number 、 `small`、 `medium`、`large`  | `medium`|
| shape | 属性：形状（方形、圆形） |  `circle`、 `square` | `circle` |
| src | 属性：图片地址  | string | -  |
| alt | 属性：替代文本  | string |  `avatar`  |

