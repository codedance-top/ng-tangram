
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
      <nt-example-legend title="基本设置">
        最简单的用法，设置 `src` 设置用户头像图片路径。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
      <nt-example>
        <nt-example-showcase>
          <demo-avatar-shape></demo-avatar-shape>
        </nt-example-showcase>
        <nt-example-legend title="形状设置">
          通过设置 `shape` 属性，改变用户头像形状。 默认圆角方形
        </nt-example-legend>
        <nt-example-code [code]="shapeCode"></nt-example-code>
      </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-avatar-size></demo-avatar-size>
      </nt-example-showcase>
      <nt-example-legend title="大小设置">
        通过设置 `size` 改变用户头像大小。<br> 可选字段 `small`、 `medium`、`large`, 也可以通过样式自定义大小。
      </nt-example-legend>
      <nt-example-code [code]="sizeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 属性：头像大小 | `small`、 `medium`、`large`  | `medium`|
| shape | 属性：形状（方形、圆形） |  `circle`、 `square` | `circle` |
| src | 属性：图片地址  | string | -  |
| alt | 属性：替代文本  | string |  `avatar`  |

