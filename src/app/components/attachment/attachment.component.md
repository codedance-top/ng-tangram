文件上传控件

## 何时使用

将文件、图片、音频等上传到远程服务器的时候使用。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-attachment-basic></example-attachment-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">上传文件。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-attachment-accept></example-attachment-accept>
      </nt-example-showcase>
      <nt-example-legend title="控制上传文件类型">通过属性accept控制上传文件为png格式图片或css文件。</nt-example-legend>
      <nt-example-code [code]="acceptCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-attachment-event></example-attachment-event>
      </nt-example-showcase>
      <nt-example-legend title="错误处理">当文件过大时进行提示。例：文件超过0.5MB时提示。</nt-example-legend>
      <nt-example-code [code]="eventCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>
