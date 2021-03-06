# [0.9.0-beta-2](https://github.com/codedance-top/ng-tangram/compare/0.9.0-beta.1...0.9.0-beta-2) (2020-11-27)

### Bug Fixes

* **notifier:** 修复通知栏背景色透明的问题 ([2c5d1df](https://github.com/codedance-top/ng-tangram/commit/2c5d1dfde08ba06f4fe2a65d6b50b1cea6050ccb))


# [0.9.0-beta-1](https://github.com/codedance-top/ng-tangram/compare/0.8.1...0.9.0-beta-1) (2020-11-25)

### Bug Fixes

* **datepicker:** 修复 `NtDatePickerControl` 导出会报错的问题 ([4456356](https://github.com/codedance-top/ng-tangram/commit/4456356ce6d64da10e8c06c317fd85a8772c6417))
* **table:** 修复 cdk v11 兼容性问题 ([6fc9ca7](https://github.com/codedance-top/ng-tangram/commit/6fc9ca77f9a1b1a913ebc355398317a029c56335))
* **table:** 修复 table 与 最近版本 CDK 不兼容的问题 ([8a02942](https://github.com/codedance-top/ng-tangram/commit/8a02942911e8fa526963a0746bf203c342536c63))

### Features

* **angular:** 支持 angular v11 ([8ac03eb](https://github.com/codedance-top/ng-tangram/commit/8ac03ebe61cbc5bd8b32836c09dcc159c42825a5))
* **notifier:** 新增通知组件模块 `NtNotifierModule` ([3d696fd](https://github.com/codedance-top/ng-tangram/commit/3d696fd80ba7a80951773ab432f1f5f89f11ddd2))


## [0.8.1](https://github.com/codedance-top/ng-tangram/compare/0.8.0...0.8.1) (2020-11-24)

### Bug Fixes

* **datepicker:** 修复 `NtDatePickerControl` 导出会报错的问题 ([4456356](https://github.com/codedance-top/ng-tangram/commit/4456356ce6d64da10e8c06c317fd85a8772c6417))

# [0.8.0](https://github.com/codedance-top/ng-tangram/compare/0.7.0...0.8.0) (2020-11-24)

### Bug Fixes

* **autocomplete:** 修复类型信息错误的问题 ([37dcc49](https://github.com/codedance-top/ng-tangram/commit/37dcc497ee1f0909b52f9d42a5271099f4c6e8e0))
* **datepicker:** 修复 datepicker 类型错误问题 ([fa1f6ff](https://github.com/codedance-top/ng-tangram/commit/fa1f6fff8d1e2d48a7586e989318bee7cdc60302))
* **forms:** 修复编译时 focus 方法的类型错误问题 ([1d1025e](https://github.com/codedance-top/ng-tangram/commit/1d1025e6fa9cd823fa9494ea755b14f94f9ca9c1))
* **picture:** 修复了当设置 maxFiles 之后还能设置超出长度的问题 ([5ccaf79](https://github.com/codedance-top/ng-tangram/commit/5ccaf79988e79592b5b08c2fb64c84307b3aef0a))
* **select:** 修复当 value 为数字 0 时不会被选中的问题 ([5567a96](https://github.com/codedance-top/ng-tangram/commit/5567a960552eefd56e4eb754c50c1d96f210991a))
* **table:** 修复 sort 在空值时状态不更新的问题 ([0eb9b1a](https://github.com/codedance-top/ng-tangram/commit/0eb9b1ab5874af45693297b52277f981c066779a))
* **table:** 修复 table 与 最近版本CDK 不兼容的问题 ([8a02942](https://github.com/codedance-top/ng-tangram/commit/8a02942911e8fa526963a0746bf203c342536c63))
* **typescript:** 修复继承 `NtFormFieldControl` 导致的类型信息错误问题 ([2e19fb3](https://github.com/codedance-top/ng-tangram/commit/2e19fb3a2efbccb112acdacfc00f1a725250dfb3))

### Features

* **angular:** 升级至 angular v10 ([3a0f323](https://github.com/codedance-top/ng-tangram/commit/3a0f323d778d675ac4b6c9cec002092ac548eb06))
* **core:** `DateApdater` 增加 `getValidDateOrNull` 方法 ([3ffc9df](https://github.com/codedance-top/ng-tangram/commit/3ffc9df1edc65bec16ade27e6121d5aa1843fba0))
* **datepicker:** 增加 DateRangePicker 组件 ([5286f8a](https://github.com/codedance-top/ng-tangram/commit/5286f8a5e1323970efdfe0a23456b834af24a725))
* **forms:** `NtFormFieldControl` 增加 `getErrors` 方法，用于获取非 ControlValueAceesor 控件的错误 ([b4fb5a1](https://github.com/codedance-top/ng-tangram/commit/b4fb5a14a6c99e3203022463e98a4a65a912e6c6))
* **picture:** 增加了 maxFiles 属性，取消了 multiple 属性，现在根据 maxFiles 自动判断 multiple 选项 ([619aa0c](https://github.com/codedance-top/ng-tangram/commit/619aa0c8b6e0580959c3a2505bc042245a537e3c))
* **table:** 排序的 icon 样式现在采用 fontawesome 的字体 ([9850faa](https://github.com/codedance-top/ng-tangram/commit/9850faac36ba0abc7eb109d526b37f2ae55b92fe))


# [0.7.0](https://github.com/codedance-top/ng-tangram/compare/0.6.0...0.7.0) (2020-08-17)

### Bug Fixes

* **forms:** 修复 form-field 的 labelWidth 属性和 ntFormLabelWidth 冲突的问题 ([7b21b21](https://github.com/codedance-top/ng-tangram/commit/7b21b213b6f20ea557a7c0456c241a3d5711c20c))
* **forms:** 优化 form-field 组件的排列设置方式 ([5fc6028](https://github.com/codedance-top/ng-tangram/commit/5fc6028a8641af5065bd383d7e0e9fd80b384e2d))
* **option:** 修复 disabled 属性不起作用的问题 ([9d92aa6](https://github.com/codedance-top/ng-tangram/commit/9d92aa6ab4400573ca215c9bcafe467ade0b6ed6))
* **option:** 修复 option 的 disabled 属性不起作用的问题 ([29ac088](https://github.com/codedance-top/ng-tangram/commit/29ac0889941a97cd9e2f8db2ccc418df183336a6))
* **pagination:** 修复更改 pageCount 属性时，页码高于计算之后的最大页数会出现错误的问题 ([f07ceca](https://github.com/codedance-top/ng-tangram/commit/f07cecae9ac5ba70ea074f52ac765506023f88c5))
* **picture:** 修复无法读取图片预览图的问题 ([6002814](https://github.com/codedance-top/ng-tangram/commit/600281402df45fe24269189585274f136894a310))
* **upload:** 修复 upload 模块在 ivy 模式下编译错误的问题 ([ee4bc4e](https://github.com/codedance-top/ng-tangram/commit/ee4bc4ebaa3bebdbcdaadd5b14156ec6b89c0a7e))
* **drawer:** 修复在 chrome 和 firefox 浏览器下弹出动画失效的问题 ([4c322c5](https://github.com/codedance-top/ng-tangram/commit/4c322c5f31afbcac5e92c0da6734c71cb10942de))
* **overlay:** 优化了 overlay 外部点击判断逻辑 ([2858d58](https://github.com/codedance-top/ng-tangram/commit/2858d58a9458d430f97afc0647e7c1988083c233))
* **overlay:** 优化了 Overlay 的 takeUntil 顺序 ([bbb4b00](https://github.com/codedance-top/ng-tangram/commit/bbb4b001b3deacd87149f8cd1606c489bcfac514))

### Features

* 支持 Ivy Renderer
* 优化 typescript 导入路径 ([cbdaa10](https://github.com/codedance-top/ng-tangram/commit/cbdaa1048779abe5b779d4e822a50a840903740c))
* **angular:** 支持 angular 9.1.x ([aef9223](https://github.com/codedance-top/ng-tangram/commit/aef92236f02ea6946ecbe744e3959b12f55fbeb7))
* **select:** 增加控制显示清除icon的 clearable 属性 ([7f134c6](https://github.com/codedance-top/ng-tangram/commit/7f134c60f97209374416639d18f410ed012dbbac))
* **autocomplete:** 新增了 autocomplete 组件 ([d44ed3f](https://github.com/codedance-top/ng-tangram/commit/d44ed3f187ebce7a397405268a7e2466290abc52))
* **forms:** 新增内置验证器 ([e01f249](https://github.com/codedance-top/ng-tangram/commit/e01f249cfc8a1bfb15b2b4fcedc5356500b8d6c4))
* **overlay:** 支持 ivy render ([8c7beb3](https://github.com/codedance-top/ng-tangram/commit/8c7beb36c306d39c650739c3bbb9832f1b695dda))
* **pagination:** 样式采用自定义的方式，不再依赖 foundation, CssClass `pagination` => `nt-pagination` ([02bac13](https://github.com/codedance-top/ng-tangram/commit/02bac13f02e4968651c080561be232283c4b355a))
* **checkbox,radio:** 新增 checkbox 和 radio 的 group 组件事件 `(selectionChange)` ([2f38fc6](https://github.com/codedance-top/ng-tangram/commit/2f38fc68eb4ebd15c32489dd69b4f6b784490244))
* **drawer:** 增加 touchmode 属性，可以在触碰时关闭 ([4d3d6f4](https://github.com/codedance-top/ng-tangram/commit/4d3d6f41e681a689399f386557b594d983c2c8c2))
* **table:** 新增了 talbe 的 sort属性，用于改变设置列的初始sort值 ([8bb4b95](https://github.com/codedance-top/ng-tangram/commit/8bb4b9564383801aa25dbee37fc82e4425bc56b3))


# [0.6.0](https://github.com/codedance-top/ng-tangram/compare/0.6.0-rc.0...0.6.0) (2020-02-10)

### Bug Fixes

* **attachment:** 修复 errors 数据类型错误的问题 ([fb64200](https://github.com/codedance-top/ng-tangram/commit/fb6420040c5af71a8a93645c0a612e3b4328d87e))
* **drawer:** 修复 drawer 在服务器端渲染时抛出异常的问题 ([d5bf646](https://github.com/codedance-top/ng-tangram/commit/d5bf646eea75b9be67ad06579e0977e01c785d3a))
* **file:** 修复 `NtFileSelectDirective` 注入成服务的代码 ([54f773b](https://github.com/codedance-top/ng-tangram/commit/54f773baad97766ee4a9ee91a74f65c48b6d6f4d))
* **markdown:** 修复 `NtMarkedEngine` 错误处理失败的问题 ([555cfd7](https://github.com/codedance-top/ng-tangram/commit/555cfd7857f6fb063ed545d90740b101a2e15f90))
* **markdown:** 修改样式变量的命名 ([478c9b1](https://github.com/codedance-top/ng-tangram/commit/478c9b123a7ab12afb1867a4aa38fc402b2937c4))
* **markdown:** 修复 path 路径无法解析成文本内容的问题 ([d772353](https://github.com/codedance-top/ng-tangram/commit/d7723530a8339ad724c2cb0a5843d72b62e0ed82))
* **overlay:** 优化了 overlay 外部点击判断逻辑 ([2858d58](https://github.com/codedance-top/ng-tangram/commit/2858d58a9458d430f97afc0647e7c1988083c233))
* **overlay:** 修复 overlay 弹层关闭事件订阅时机不准确的问题 ([163bbd9](https://github.com/codedance-top/ng-tangram/commit/163bbd9dfeef8fb206556d3aa70797bdfc4232af))
* **overlay:** 修复了在嵌套 overlay 下点击子层内容时关闭父层的问题 ([e9b71ab](https://github.com/codedance-top/ng-tangram/commit/e9b71ab32405e0597b18085662eedd390a616685))
* **picture:** 修复 errors 数据类型错误的问题 ([4b22ffe](https://github.com/codedance-top/ng-tangram/commit/4b22ffe863d5ca254d1933eef79457b8b011543d))
* **popconfirm:** 修复了在嵌套层级时 (其他 overlay容器嵌套 popconfirm) 时点击确定/取消会关闭父容器的问题 ([c58d96b](https://github.com/codedance-top/ng-tangram/commit/c58d96b3c46475e10c5f5603c01682a5164eb1bf))
* **table:** 修复 `nt-column` 会提示类型错误的问题 ([e075562](https://github.com/codedance-top/ng-tangram/commit/e07556222df3cd6e636d67751518907489b8a82e))
* **table:** 修复构建时提示组件声明错误的问题 ([ad26706](https://github.com/codedance-top/ng-tangram/commit/ad267064b306f2c21600d5cf8bb06012aebe2eb7))
* **upload:** 修复 upload 异常捕捉失效的问题 ([50604a9](https://github.com/codedance-top/ng-tangram/commit/50604a95bb885ef445ff305b9a560d97615fc8e2))

### Features

* **angular:** 更新至 angular 9.0.0 ([f0d109c](https://github.com/codedance-top/ng-tangram/commit/f0d109c4b6ab80e4d2c9c33aa9ecb51c1c57ff66))
* **animate:** 渐变动画增加节奏控制参数，现在可以使用 `animation-timing-function` 值了 ([1e1747f](https://github.com/codedance-top/ng-tangram/commit/1e1747f6dd87f951be52ef53f078c53660cccc79))
* **core:** 新增 fromOutsideElementClick 事件 ([bbd99c9](https://github.com/codedance-top/ng-tangram/commit/bbd99c93730528b4efab8a72febed7751164ccdc))
* **datepicker:** 通过覆盖 --nt-overlay-container-background 的方式改变默认 overlay 样式 ([54aaea6](https://github.com/codedance-top/ng-tangram/commit/54aaea62f276e19e0ce7b055e2eb737d7f53dc07))
* **drawer:** 新增事件 afterOpen,afterClosed,beforeOpen,beforeClosed 方法 open(),close() 并移除了opened 属性 ([9cb5324](https://github.com/codedance-top/ng-tangram/commit/9cb532458caa7ebf32f53ffae70468cef439154a))
* **dropdown:** 通过覆盖 --nt-overlay-container-background 的方式改变默认 overlay 样式 ([204e4b1](https://github.com/codedance-top/ng-tangram/commit/204e4b1ce6acf1353567a1a21d89ab259877c5a4))
* **markdown:** 升级 `marked@^0.8.0`, `codemirror@^5.46.0` ([9da265b](https://github.com/codedance-top/ng-tangram/commit/9da265b1bdf75e2eea534534998b02d517b917f2))
* **overlay:** 增加 forceUpdatePosition 方法用于主动改变方向等信息，并且优化了样式内容。 ([65840e8](https://github.com/codedance-top/ng-tangram/commit/65840e88f71659d8db04acc6cdf1a5ef76c23683))
* **popconfirm:** 通过覆盖 --nt-overlay-container-background 的方式改变默认 overlay 样式 ([0e04925](https://github.com/codedance-top/ng-tangram/commit/0e04925733653f4c9d447b2237fb99787b0d5f88))
* **popover:** 通过覆盖 --nt-overlay-container-background 的方式改变默认 overlay 样式 ([71f31bc](https://github.com/codedance-top/ng-tangram/commit/71f31bcb67fe4f3ae0f17d864c817b5c10a2357a))
* **select:** 通过覆盖 --nt-overlay-container-background 的方式改变默认 overlay 样式 ([610a63c](https://github.com/codedance-top/ng-tangram/commit/610a63c171b1c26cc311776f7ae598bc2d0a8d0d))
* **slider:** 新增了 slider 组件 ([e16f85f](https://github.com/codedance-top/ng-tangram/commit/e16f85f57f1108dbb44ab9222d1185e4d3300c58))
* **style:** 升级到 `foundation-sites@6.6.1` ([0d31257](https://github.com/codedance-top/ng-tangram/commit/0d31257d33a5e81ff65e6b3e346a43a8ec0ba3a8))
* **tooltip:** 通过覆盖 --nt-overlay-container-background 的方式改变默认 overlay 样式 ([56da64e](https://github.com/codedance-top/ng-tangram/commit/56da64eb69a380f76467af182fb5b4b4466ed434))

### BREAKING CHANGES

* **drawer:** 移除 opened 属性，openedChange 和 outsideClick 事件
* **markdown:** $nt-markdownquote-* => $nt-markdown-quote-*
* **markdown:** 新增 `~@ng-tangram/markdown/styles` 样式导入方式 ([286595b](https://github.com/codedance-top/ng-tangram/commit/286595b7e4a3151c0ebc4eb892022317837a862c))
* **overlay:** 修改变量名称 $nt-overlay-container-padding -> $nt-overlay-container-arrow-gap, 移除了 $nt-overlay-container-arrow-cover, --nt-overlay-container-background 和 --nt-overlay-container-arrow-gap。
* **table:** 删除了 ntColumnCellDef, ntColumnHeaderDef, ntColumnFooterDef, nt-column-header, th[nt-column-header], nt-column-footer, td[nt-column-footer], nt-column-cell, td[nt-column-cell]
* **upload:** 新增上传结果类型 `NtUploadEvent`, `NtUploadResponse`, `NtUploadError` ([fd9218f](https://github.com/codedance-top/ng-tangram/commit/fd9218f9143054f133c776abb74bb4c4e89bd715))

