
# 输入框 Input

## 何时使用

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-input-basic></example-input-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的输入框。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-input-group></example-input-group>
      </nt-example-showcase>
      <nt-example-legend title="附加文本">
        带有附加文本的输入框，若需要实现附加文本透明化效果，可以使用<code>transparent</code>属性
      </nt-example-legend>
      <nt-example-code [code]="groupCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| transparent | 属性：附加文本是否透明 | `boolean` | false |
