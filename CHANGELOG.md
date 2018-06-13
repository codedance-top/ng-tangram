# 2018-06-10 0.3.0

* 新增 `NtPopConfirmComponent` template 属性，标题现在支持 html，template 类型
* 新增 `NtPopoverComponent` template 属性，标题现在支持 html，template 类型
* 新增 `NtTooltipComponent` template 属性，标题现在支持 html，template 类型
* 新增 `NtOverlayComponent` keydownEvents 事件
* 新增 `NtSelectComponent`，`NtDatePickerComponent` scss 变量 `*-symbol-font-family`, `*-symbol-font-family`, `*-symbol-font-family`
* 新增 `NtDropdownComponent` 样式 `nt-dropdown-toggle`
* 优化 `NtSelectComponent` 支持键盘事件
* bug 修复 `NtSelectComponent`，`NtDatePickerComponent` 在弹出窗口点击 ESC 健时不能正确移除焦点的问题

# 2018-05-29 0.2.0

* 优化 `NtFileComponent` 文件大小显示
* 优化 `NtSelectComponent` 在清空值时会触发 valueChange 事件
* 新增 `NtOptionComponent` 属性 label 可以自定义选中时显示的label (默认会取内联文字)

# 2018-05-14 0.2.0-alpha.12

* 新增 `NtProgressCircleComponent` 组件
* 变更 `NtScrim` loading 效果
* 优化 `NtFileComponent` 样式

# 2018-05-04. 0.2.0-alpha.11

* angular v6兼容优化 `OverlayOrigin` 引用 改为 `CdkOverlayOrigin` 
* angular universal 兼容优化 增加判断平台的逻辑

# 2018-05-04. 0.2.0-alpha.10
* 变更 `NtOverlayComponent` 取消了 `opened`, `closed` 事件，增加了 `afterOpen` , `AfterClosed`, `beforeOpen`, `beforeClosed` 事件
* 新增 `NtSelectComponent` `filter` 属性，支持过滤选项

# 2018-05-03. 0.2.0-alpha.9

* bugfix 修复了 `NtPaginationComponent` 当总页数是 1 的时候 出现的长度问题

# 2018-05-03. 0.2.0-alpha.8

* 新增 `NtPictureComponent` type 属性，支持圆形图片框

* bugfix 修复了 `NtDropdownComponent` 属性 `position="bottomRight"` 时的定位样式问题

# 2018-04-27. 0.2.0-alpha.7

* 新增 `NtDropdownPaneComponent.autosize`  属性，将窗口宽度设置为 auto
* 优化 `NtSelectComponent` 选中焦点样式
* 优化 `NtFileComponent` 文件列表样式
* 优化 样式结构

# 2018-04-27. 0.2.0-alpha.6

* 新增 `NtFormFieldComponent.messages` 属性 可以根据字段自定义错误信息
* 新增 form scss 属性 `$nt-form-label-padding`
* 新增 form scss 属性 `$nt-datepicker-symbol-*`、`$nt-select-symbol-*` 符号相关样式
* 新增 form scss 属性 `$nt-form-label-*` 标题栏相关样式

* 移除 form scss 属性 `$nt-form-horizontal-width`

* 优化 scss.nt-form-label 垂直剧中样式
* 优化 nt-datepicker nt-select scss 符号垂直剧中样式

# 2018-04-27. 0.2.0-alpha.5
* 新增 `ntFormLabelWidth` 指令，可以设定表单的 `label` 宽度，字段会继承此宽度（自属性优先）
* 新增 `NtFormOrientation` 指令，可以设定表单结构，字段会继承此属性（自属性优先）

* bugfix 修复了 使用 `NtInputDirective` 指令时会出现 `No provider for Platform ` 错误
* bugfix 修复了 `textarea` 在验证错误时 `:focus` 样式不正确的问题

# 2018-04-26. 0.2.0-alpha.4

* 变更 `nt-dropdown-pane` 增加 `arrow` 属性，可以设定是否显示箭头
* 变更 `nt-form-field` 增加 `labelWidth` 属性，可以在 横向表单 设定 label 占位宽度
* 变更 form scss 属性 `$form-horizontal-label-width` -> `$nt-form-horizontal-width`
* 变更 `NtModalConfig` 增加 width 和 height 属性 并且设定默认宽度（600px）
* 变更 `nt-picture` 增加 错误和 成功效果

* bugfix 修复了 `nt-overlay` 的 `position` 为 `bottomRight` 时箭头定位错误的问题
* bugfix 修复了 `nt-file` 和 `nt-picture` 删除索引不正确的问题


# 2018-04-25. 0.2.0-alpha.3

* 变更 `nt-forms-control` 的样式不再提供 `margin`
* 变更 `NtModal` 增加 `transparent` 属性， 可以设置背景色为透明

# 2018-04-24. 0.2.0-alpha.2
* 变更 `NtPopConfirmComponent` 新增了 `confirmText`，`cancelText`
* 变更 `NtPictureComponent` 新增了 preview 效果
* 变更 `NtColumnComponent` 优化了 排序效果
* bugfix 修复了操作表单数据源时（push） UI 不响应的问题

# 2018-04-23. 0.2.0-alpha.0

* 新增 Component `nt-progress`
* 新增 Component `nt-file`
* 新增 Component `nt-picture`
* 新增 Service `upload`

* 变更 `NtInput` 删除了 `width` 属性
* 变更 `NtFormFieldControl` 的 `focus` 方法不是必须实现的
* 变更 `NtFormModule` 现在不会导出 `FormsModule` 和 `ReactiveFormsModule` 

* bugfix 修复了在没有表单时 表单组件会报错的问题

# 2018-04-12. 0.1.0-alpha.5

* 改进 `NtValidationTransformer` 注入方式，现在可以支持全局配置默认 `Transformer`（需要用 `NtFormsModule.forRoot()` 方式在根模块 `import`）。
* 组件 `nt-badge` 增加 `type` 属性， `static`（默认），`float`（右上角浮动），`notify`（小红点）。

# 2018-04-10. 0.1.0-alpha.0

* 新增 Component `ant-icon`
* 新增 Component `badge`
* 新增 Component `breadcrumbs`
* 新增 Component `button`
* 新增 Component `button-group`
* 新增 Component `callout`
* 新增 Component `datepicker`
* 新增 Component `dropdown`
* 新增 Component `form-field`
* 新增 Component `input`
* 新增 Component `label`
* 新增 Component `menu`
* 新增 Component `pagination`
* 新增 Component `popconfirm`
* 新增 Component `popover`
* 新增 Component `scrim`
* 新增 Component `select`
* 新增 Component `table`
* 新增 Component `tooltip`
* 新增 Service `modal`

