
## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-switch-basic></example-switch-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">
      最简单的用法。默认为方形形状的开关
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-switch-circle></example-switch-circle>
      </nt-example-showcase>
      <nt-example-legend title="形状">
        如果你想要圆形，也可以通过 `circle` 属性来设置圆形开关
      </nt-example-legend>
      <nt-example-code [code]="circleCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-switch-size></example-switch-size>
      </nt-example-showcase>
      <nt-example-legend title="大小">
        通过`class` 设置 switch 大小
      </nt-example-legend>
      <nt-example-code [code]="sizeCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-switch-disabled></example-switch-disabled>
      </nt-example-showcase>
      <nt-example-legend title="禁用">
        通过`disabled`属性 设置 switch 禁用 状态
      </nt-example-legend>
      <nt-example-code [code]="disabledCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-switch-checked></example-switch-checked>
      </nt-example-showcase>
      <nt-example-legend title="禁用">
        通过`checked`属性 设置 switch 选中状态
      </nt-example-legend>
      <nt-example-code [code]="checkedCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-switch-change></example-switch-change>
      </nt-example-showcase>
      <nt-example-legend title="禁用">
        通过`change` 方法  监听状态变化
      </nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<nt-markdown-block [data]="api"></nt-markdown-block>
