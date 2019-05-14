
## 何时使用

将图片等上传到远程服务器上的时候。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-picture-basic></example-picture-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">上传图片。注：支持点击或拖拽上传。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-file-event></example-file-event>
      </nt-example-showcase>
      <nt-example-legend title="错误处理">当图片过大时进行提示。例：图片超过0.5MB时提示。</nt-example-legend>
      <nt-example-code [code]="eventCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<nt-markdown-block [data]="api"></nt-markdown-block>
