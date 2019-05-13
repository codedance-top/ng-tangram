向下弹出的列表。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-checkbox-basic></example-checkbox-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的复选框</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-checkbox-disabled></example-checkbox-disabled>
      </nt-example-showcase>
      <nt-example-legend title="禁用">禁用的复选框</nt-example-legend>
      <nt-example-code [code]="disabledCode"></nt-example-code>
    </nt-example>
  </div>
  
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-checkbox-all></example-checkbox-all>
      </nt-example-showcase>
      <nt-example-legend title="全选">多选和全选</nt-example-legend>
      <nt-example-code [code]="allCode"></nt-example-code>
    </nt-example>
  </div>
  
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-checkbox-change></example-checkbox-change>
      </nt-example-showcase>
      <nt-example-legend title="change事件">监听 checkbox 值的改变</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API  

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | true |
| disabled | 是否禁用 | `boolean` | true |
| readOnly | 设置只读状态 | `boolean` | true |
| indeterminate | 设置全选状态 | `boolean` | - |
