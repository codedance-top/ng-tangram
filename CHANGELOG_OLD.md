# 0.4.0 (2018-09-10)

### Bug Fixes

* **input:** 新增 nt-input-group, nt-input-addon 组件

### Features

* **table:**  重写 nt-table 组件，基于 @angular/cdk/table 实现

## 0.3.4  (2018-07-17)

### Bug Fixes

* **forms:** 修复了 `NtFormFieldComponent` error 类型信息错误的问题

## 0.3.3 (2018-07-17)

### Features

* **overlay:** 新增 `NtOverlayComponent` 系列组件事件，afterOpen、afterClosed、beforeOpen、beforeClosed、positionChange 
* **pagination:** 新增 `NtPaginationModule` 模块注册方法 withConfig 代替 forRoot，forRoot 方法将会废弃
* **popconfirm:** 新增 `NtPopConfirmComponent` 样式 api $nt-popconfirm-button-margin 

## 0.3.1 (2018-06-28)

### Bug Fixes

* **checkbox:** 修复了 `NtCheckboxComponent` 在 aot 编译时 css 形状不正确的问题

# 0.3.0 (2018-06-28)

### Bug Fixes

* **overlay:** 修复了 `NtOverlayComponent` position 在 left 和 right 时位置不对的问题
* **pucture:** 修复了 `NtPictureComponent` 上传之后不显示进度条的问题
* **select:** 修复了 `NtSelectComponent` 键盘事件在启用过滤模式下不正确执行的问题
* **datepicker:** 修复了 `NtSelectComponent`，`NtDatePickerComponent` 在弹出窗口点击 ESC 健时不能正确移除焦点的问题

### Features

* **checkbox:** 新增 `NtCheckboxComponent, NtCheckboxGroupComponent` 组件
* **radio:** 新增 `NtRadioComponent, NtRadioGroupComponent` 组件
* **popconfirm:** 新增 `NtPopConfirmComponent` template 属性，标题现在支持 html，template 类型
* **popover:** 新增 `NtPopoverComponent` template 属性，标题现在支持 html，template 类型
* **tooltip:** 新增 `NtTooltipComponent` template 属性，标题现在支持 html，template 类型
* **overlay:** 新增 `NtOverlayComponent` keydownEvents 事件
* **datepicker:** 新增 `NtDatePickerComponent` scss 变量 `$nt-datepicker-symbol-font-family`
* **select:** 新增 `NtSelectComponent` scss 变量 `$nt-select-symbol-font-family`
* **select:**  `NtSelectComponent` 支持键盘事件

# 0.2.0 (2018-05-29)

### Bug Fixes

* **pagination:** 修复了 `NtPaginationComponent` 当总页数是 1 的时候 出现的长度问题
* **dropdown:** 修复了 `NtDropdownComponent` 属性 `position="bottomRight"` 时的定位样式问题
* **forms:** 修复了在没有表单时 表单组件会报错的问题
* **input:** 修复了 使用 `NtInputDirective` 指令时会出现 `No provider for Platform ` 错误
* **input:** 修复了 `textarea` 在验证错误时 `:focus` 样式不正确的问题
* **overlay:** 修复了 `nt-overlay` 的 `position` 为 `bottomRight` 时箭头定位错误的问题
* **file:** 修复了 `nt-file` 和 `nt-picture` 删除索引不正确的问题
* **file:** 优化 `NtFileComponent` 文件大小显示
* **file:** 优化 `NtFileComponent` 样式
* **file:** 优化 `NtFileComponent` 文件列表样式
* **select:** 优化 `NtSelectComponent` 在清空值时会触发 valueChange 事件
* **select:** 优化 `NtSelectComponent` 选中焦点样式
* **global:** 修复了操作表单数据源时（push） UI 不响应的问题
* **styles:** 优化 样式结构
* **forms:** 优化 .nt-form-label 垂直剧中样式
* **datepicker:** 优化 nt-datepicker nt-select scss 符号垂直剧中样式

### Features

* **global:** angular v6兼容优化 `OverlayOrigin` 引用 改为 `CdkOverlayOrigin` 
* **global:** angular universal 兼容优化 增加判断平台的逻辑
* **option:** 新增 `NtOptionComponent` 属性 label 可以自定义选中时显示的label (默认会取内联文字)
* **select:** 新增 `NtSelectComponent` `filter` 属性，支持过滤选项
* **picture:** 新增 `NtPictureComponent` type 属性，支持圆形图片框
* **dropdown:** 新增 `NtDropdownPaneComponent.autosize`  属性，将窗口宽度设置为 auto
* **forms:** 新增 `NtFormFieldComponent.messages` 属性 可以根据字段自定义错误信息
* **forms:** 新增 form scss 属性 `$nt-form-label-padding`
* **forms:** 新增 form scss 属性 `$nt-datepicker-symbol-*`、`$nt-select-symbol-*` 符号相关样式
* **forms:** 新增 form scss 属性 `$nt-form-label-*` 标题栏相关样式
* **forms:** 新增 `ntFormLabelWidth` 指令，可以设定表单的 `label` 宽度，字段会继承此宽度（自属性优先）
* **forms:** 新增 `NtFormOrientation` 指令，可以设定表单结构，字段会继承此属性（自属性优先）
* **progress:** 新增 Component `nt-progress`
* **file:** 新增 Component `nt-file`
* **picture:** 新增 Component `nt-picture`
* **upload:** 新增 Service `upload`

### Breaking changes

* **dropdown:** 变更 `nt-dropdown-pane` 增加 `arrow` 属性，可以设定是否显示箭头
* **forms:** 变更 `nt-form-field` 增加 `labelWidth` 属性，可以在 横向表单 设定 label 占位宽度
* **forms:** 变更 form scss 属性 `$form-horizontal-label-width` -> `$nt-form-horizontal-width`
* **forms:** 变更 `nt-forms-control` 的样式不再提供 `margin`
* **forms:** 变更 `NtFormFieldControl` 的 `focus` 方法不是必须实现的
* **forms:** 变更 `NtFormsModule` 现在不会导出 `FormsModule` 和 `ReactiveFormsModule` 
* **forms:** 移除 form scss 属性 `$nt-form-horizontal-width`
* **modal:** 变更 `NtModalConfig` 增加 width 和 height 属性 并且设定默认宽度（600px）
* **modal:** 变更 `NtModal` 增加 `transparent` 属性， 可以设置背景色为透明
* **picture:** 变更 `nt-picture` 增加 错误和 成功效果
* **picture:** 变更 `NtPictureComponent` 新增了 preview 效果
* **popconfirm:** 变更 `NtPopConfirmComponent` 新增了 `confirmText`，`cancelText`
* **table:** 变更 `NtColumnComponent` 优化了 排序效果
* **input:** 变更 `NtInput` 删除了 `width` 属性
* **overlay:** 变更 `NtOverlayComponent` 取消了 `opened`, `closed` 事件，增加了 `afterOpen` , `AfterClosed`, `beforeOpen`, `beforeClosed` 事件
* **scrim:** 变更 `NtScrim` loading 效果


## 0.1.1 (2018-04-12)

### Bug Fixes

* **forms:** 改进 `NtValidationTransformer` 注入方式，现在可以支持全局配置默认 `Transformer`（需要用 `NtFormsModule.forRoot()` 方式在根模块 `import`）。

### Features

* **badge:** 组件 `nt-badge` 增加 `type` 属性， `static`（默认），`float`（右上角浮动），`notify`（小红点）。

# 0.1.0 (2018-04-10)

### Features

* **icon:** 新增 Component `ant-icon`
* **badge:** 新增 Component `badge`
* **breadcrumbs:** 新增 Component `breadcrumbs`
* **button:** 新增 Component `button`
* **button:** 新增 Component `button-group`
* **callout:** 新增 Component `callout`
* **datepicker:** 新增 Component `datepicker`
* **dropdown:** 新增 Component `dropdown`
* **forms:** 新增 Component `form-field`
* **input:** 新增 Component `input`
* **label:** 新增 Component `label`
* **menu:** 新增 Component `menu`
* **pagination:** 新增 Component `pagination`
* **popconfirm:** 新增 Component `popconfirm`
* **popover:** 新增 Component `popover`
* **scrim:** 新增 Component `scrim`
* **select:** 新增 Component `select`
* **table:** 新增 Component `table`
* **tooltip:** 新增 Component `tooltip`
* **modal:** 新增 Service `modal`
