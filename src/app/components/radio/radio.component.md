
## 何时使用

* 用于在多个备选项中选中单个状态。
* 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-radio-basic></example-radio-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的用法。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-radio-group></example-radio-group>
      </nt-example-showcase>
      <nt-example-legend title="单选组合">一组互斥的 nt-radio 配合使用</nt-example-legend>
      <nt-example-code [code]="groupCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-radio-change></example-radio-change>
      </nt-example-showcase>
      <nt-example-legend title="状态改变事件">状态改变</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-radio-disabled></example-radio-disabled>
      </nt-example-showcase>
      <nt-example-legend title="禁用">禁用</nt-example-legend>
      <nt-example-code [code]="disabledCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-radio-click></example-radio-click>
      </nt-example-showcase>
      <nt-example-legend title="点击事件">点击</nt-example-legend>
      <nt-example-code [code]="clickCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API  

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | true |
| required | 必须输入标识（只在模板驱动表单有效） | `boolean` | false |
| disabled | 是否禁用 | `boolean` | true |

## 方法  

| 参数 | 说明 | 默认值 |
| --- | --- | --- | --- |
| click | 点击时回调 | - |
| change | 状态改变时回调 | - |
