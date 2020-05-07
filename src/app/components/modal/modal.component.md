
模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

推荐使用加载Component的方式弹出Modal，这样可以弹出层的Component逻辑可以与上层Component完全隔离，并且做到可以随时复用

在弹出层Component中可以通过 `NtModal` 向外层Component传出数据

另外当需要一个简洁的确认框询问用户时，可以使用封装好的 ntModal.close() 等方法。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-12 large-12 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-basic></example-modal-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本使用">
        最简单的用法案例<br>适用于简短的警告提示。可以通过模版或组建的方式设置模态框中的内容.
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-12 large-12 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-config></example-modal-config>
      </nt-example-showcase>
      <nt-example-legend title="具体配置">
        模态框设置配置案例<br>
        通过设置 `NtModalConfig` 内容的样式进行修改
      </nt-example-legend>
      <nt-example-code [code]="configCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-12 large-12 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-event></example-modal-event>
      </nt-example-showcase>
      <nt-example-legend title="回调事件">
        模态框回调方法案例<br>
        通过`NtModal.open()` 返回的 `NtModalRef` 对象用于控制对话框以及进行内容间的通信
      </nt-example-legend>
      <nt-example-code [code]="eventCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-data></example-modal-data>
      </nt-example-showcase>
      <nt-example-legend title="外部更新数据">
        从外部更新模态框中数据案例<br>
        通过`NtModal.open()` 返回的 `NtModalRef.componentInstance` 对象用于控制对话框以及进行内容间的通信,多用于数据导入时弹出的进度条
      </nt-example-legend>
      <nt-example-code [code]="dataCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-width></example-modal-width>
      </nt-example-showcase>
      <nt-example-legend title="自定义宽度">
        自定义宽度案例<br>
        通过设置 `NtModalConfig.width` 来设置对话框的宽度，默认：`600px`<br>
        通过设置 `NtModalConfig.maxWidth` 来设置对话框的最大宽度，默认：`80vw`
      </nt-example-legend>
      <nt-example-code [code]="widthCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-height></example-modal-height>
      </nt-example-showcase>
      <nt-example-legend title="自定义高度">
       自定义高度案例<br>
        通过设置 `NtModalConfig.height` 来设置对话框的宽度，默认：`auto`<br>
        通过设置 `NtModalConfig.maxHeight` 来设置对话框的最大宽度
      </nt-example-legend>
      <nt-example-code [code]="heightCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-top></example-modal-top>
      </nt-example-showcase>
      <nt-example-legend title="自定义对话框距浏览器上方的距离">
        自定义对话框距浏览器上方的距离案例<br>
        通过设置 `NtModalConfig.top` 来设置对话框的宽度，默认：`80px`
      </nt-example-legend>
      <nt-example-code [code]="topCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-closable></example-modal-closable>
      </nt-example-showcase>
      <nt-example-legend title="自定义关闭按钮显示方式">
        自定义关闭按钮显示案例<br>
        通过设置 `NtModalConfig.closable` 来设置对话框的宽度，默认：`true`
      </nt-example-legend>
      <nt-example-code [code]="closableCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-has-backdrop></example-modal-has-backdrop>
      </nt-example-showcase>
      <nt-example-legend title="自定义背景层显示方式">
        自定义背景层显示方式案例<br>
        通过设置 `NtModalConfig.hasBackdrop` 来设置对话框的宽度，默认：`true`
      </nt-example-legend>
      <nt-example-code [code]="hasBackdropCode"></nt-example-code>
    </nt-example>
  </div>
   <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-center-vertically></example-modal-center-vertically>
      </nt-example-showcase>
      <nt-example-legend title="垂直水平居中显示对话框">
        垂直水平居中显示对话框案例<br>
        通过设置 `NtModalConfig.centerVertically` 为`true`, 设置垂直水平居中显示对话框，默认：`false`
      </nt-example-legend>
      <nt-example-code [code]="centerVerticallyCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-transparent></example-modal-transparent>
      </nt-example-showcase>
      <nt-example-legend title="对话框背景设置透明">
        对话框背景设置透明案例<br>
        通过设置 `NtModalConfig.transparent` 为`true`, 设置垂直水平居中显示对话框，默认：`false`
      </nt-example-legend>
      <nt-example-code [code]="transparentCode"></nt-example-code>
    </nt-example>
  </div>
   <div class="medium-6 large-6 cell">
  <nt-example>
    <nt-example-showcase>
      <example-modal-class></example-modal-class>
    </nt-example-showcase>
    <nt-example-legend title="设置对话框样式">
      设置对话框样式案例<br>
      通过设置 `NtModalConfig.backdropClass` 设置背景层样式，
      通过设置 `NtModalConfig.panelClass` 设置对话框样式
    </nt-example-legend>
    <nt-example-code [code]="transparentCode"></nt-example-code>
  </nt-example>
</div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>
