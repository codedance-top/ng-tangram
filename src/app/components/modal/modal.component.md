
模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

推荐使用加载Component的方式弹出Modal，这样可以弹出层的Component逻辑可以与上层Component完全隔离，并且做到可以随时复用

在弹出层Component中可以通过 `NtModalSubject` 向外层Component传出数据

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 NzModalService.confirm() 等方法。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-modal-basic></example-modal-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">
        最简单的用法，适用于简短的警告提示。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |

