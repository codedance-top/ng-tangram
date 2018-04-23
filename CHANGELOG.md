# 2018-04-23. 0.2.0-alpha.0

* 新增 Component nt-progress
* 新增 Component nt-file
* 新增 Component nt-picture
* 新增 Service upload

* 变更 NtInput 删除了 width 属性
* 变更 NtFormFieldControl 的 focus 方法不是必须实现的
* 变更 NtFormModule 现在不会导出 FormsModule 和 ReactiveFormsModule 

* bugfix 修复了在没有表单时 表单组件会报错的问题

# 2018-04-12. 0.1.0-alpha.5

* 改进 NtValidationTransformer 注入方式，现在可以支持全局配置默认 Transformer（需要用 NtFormsModule.forRoot() 方式在根模块 import）。
* 组件 nt-badge 增加 type 属性， static（默认），float（右上角浮动），notify（小红点）。

# 2018-04-12. 0.1.0-alpha.1 - 4

* bug fix ... 

# 2018-04-10. 0.1.0-alpha.0

* 新增 Component ant-icon
* 新增 Component badge
* 新增 Component breadcrumbs
* 新增 Component button
* 新增 Component button-group
* 新增 Component callout
* 新增 Component datepicker
* 新增 Component dropdown
* 新增 Component form-field
* 新增 Component input
* 新增 Component label
* 新增 Component menu
* 新增 Component pagination
* 新增 Component popconfirm
* 新增 Component popover
* 新增 Component scrim
* 新增 Component select
* 新增 Component table
* 新增 Component tooltip
* 新增 Service modal

