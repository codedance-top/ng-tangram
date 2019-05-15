用于展示操作进度

## 何时使用

当操作需要较长时间才能完成时，显示该操作的当前进度。

## 代码演示
<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-progress-basic></example-progress-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">标准的进度条。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-progress-circle></example-progress-circle>
      </nt-example-showcase>
      <nt-example-legend title="circle">圆形的进度条。</nt-example-legend>
      <nt-example-code [code]="circleCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<nt-markdown-block [data]="api"></nt-markdown-block>


