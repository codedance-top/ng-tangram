## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-badge-basic></example-badge-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">
        最简单的用法，适用于简短的警告提示。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-badge-colors></example-badge-colors>
      </nt-example-showcase>
      <nt-example-legend title="颜色">
        最简单的用法，适用于简短的警告提示。
      </nt-example-legend>
      <nt-example-code [code]="colorsCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-badge-icon></example-badge-icon>
      </nt-example-showcase>
      <nt-example-legend title="图标">
        也可以跟图标配合使用
      </nt-example-legend>
      <nt-example-code [code]="iconCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>
