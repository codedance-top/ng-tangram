进行标记和分类的小标签，起到提示或者分类的作用。

## 何时使用

需要按照种类、等级或性质等分别归类时，可以使用。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-label-basic></example-label-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本用法">
        直接使用标签。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-label-colors></example-label-colors>
      </nt-example-showcase>
      <nt-example-legend title="样式设置">
        共有5种样式 `primary`、`secondry`、`success`、`warning`、`alert`。
      </nt-example-legend>
      <nt-example-code [code]="colorsCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-label-icon></example-label-icon>
      </nt-example-showcase>
      <nt-example-legend title="使用图标">
        跟图标配合使用。
      </nt-example-legend>
      <nt-example-code [code]="iconCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>
