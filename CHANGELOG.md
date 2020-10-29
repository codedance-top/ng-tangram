# [0.8.0-beta.4](https://github.com/codedance-top/ng-tangram/compare/0.8.0-beta.3...0.8.0-beta.4) (2020-10-29)

### Bug Fixes

* **table:** 修复 table 与 最近版本CDK 不兼容的问题 ([8a02942](https://github.com/codedance-top/ng-tangram/commit/8a02942911e8fa526963a0746bf203c342536c63))

# [0.8.0-beta.3](https://github.com/codedance-top/ng-tangram/compare/0.8.0-beta.0...0.8.0-beta.3) (2020-09-24)

### Bug Fixes

* **picture:** 修复了当设置 maxFiles 之后还能设置超出长度的问题 ([5ccaf79](https://github.com/codedance-top/ng-tangram/commit/5ccaf79988e79592b5b08c2fb64c84307b3aef0a))

### Features

* **picture:** 增加了 maxFiles 属性，取消了 multiple 属性，现在根据 maxFiles 自动判断 multiple 选项 ([619aa0c](https://github.com/codedance-top/ng-tangram/commit/619aa0c8b6e0580959c3a2505bc042245a537e3c))


# [0.8.0-beta.2](https://github.com/codedance-top/ng-tangram/compare/0.8.0-beta.1...0.8.0-beta.2) (2020-08-27)

### Bug Fixes

* **table:** 修复 sort 在空值时状态不更新的问题 ([0eb9b1a](https://github.com/codedance-top/ng-tangram/commit/0eb9b1ab5874af45693297b52277f981c066779a))

# [0.8.0-beta.1](https://github.com/codedance-top/ng-tangram/compare/0.8.0-beta.0...0.8.0-beta.1) (2020-08-26)

### Bug Fixes

* **select:** 修复当 value 为数字 0 时不会被选中的问题 ([5567a96](https://github.com/codedance-top/ng-tangram/commit/5567a960552eefd56e4eb754c50c1d96f210991a))

# [0.8.0-beta.0](https://github.com/codedance-top/ng-tangram/compare/0.7.0...0.8.0-beta.0) (2020-08-24)

### Features

* **angular:** 升级至 angular v10 ([3a0f323](https://github.com/codedance-top/ng-tangram/commit/3a0f323d778d675ac4b6c9cec002092ac548eb06))
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

# [0.7.0-beta.7](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.6...0.7.0-beta.7) (2020-07-10)

### Bug Fixes

* **forms:** 修复 form-field 的 labelWidth 属性和 ntFormLabelWidth 冲突的问题 ([7b21b21](https://github.com/codedance-top/ng-tangram/commit/7b21b213b6f20ea557a7c0456c241a3d5711c20c))

# [0.7.0-beta.6](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.5...0.7.0-beta.6) (2020-07-10)

### Bug Fixes

* **forms:** 优化 form-field 组件的排列设置方式 ([5fc6028](https://github.com/codedance-top/ng-tangram/commit/5fc6028a8641af5065bd383d7e0e9fd80b384e2d))
* **overlay:** 优化 Overlay 中的 takeUntil 顺序 ([bbb4b00](https://github.com/codedance-top/ng-tangram/commit/bbb4b001b3deacd87149f8cd1606c489bcfac514))

# [0.7.0-beta.5](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.4...0.7.0-beta.5) (2020-06-22)

### Bug Fixes

* **option:** 修复 option 的 disabled 属性不起作用的问题 ([29ac088](https://github.com/codedance-top/ng-tangram/commit/29ac0889941a97cd9e2f8db2ccc418df183336a6))

# [0.7.0-beta.4](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.3...0.7.0-beta.4) (2020-06-22)

### Bug Fixes

* **option:** 修复 disabled 属性不起作用的问题 ([9d92aa6](https://github.com/codedance-top/ng-tangram/commit/9d92aa6ab4400573ca215c9bcafe467ade0b6ed6))

### Features

* **checkbox,radio:** 新增 checkbox 和 radio 的 group 组件事件 `(selectionChange)` ([2f38fc6](https://github.com/codedance-top/ng-tangram/commit/2f38fc68eb4ebd15c32489dd69b4f6b784490244))

# [0.7.0-beta.3](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.2...0.7.0-beta.3) (2020-06-08)

### Features

* **drawer:** 增加 touchmode 属性，可以在触碰时关闭 ([4d3d6f4](https://github.com/codedance-top/ng-tangram/commit/4d3d6f41e681a689399f386557b594d983c2c8c2))

# [0.7.0-beta.2](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.1...0.7.0-beta.2) (2020-06-08)

### Bug Fixes

* **drawer:** 修复在 chrome 和 firefox 浏览器下弹出动画失效的问题 ([4c322c5](https://github.com/codedance-top/ng-tangram/commit/4c322c5f31afbcac5e92c0da6734c71cb10942de))
* **overlay:** 优化了 overlay 外部点击判断逻辑 ([2858d58](https://github.com/codedance-top/ng-tangram/commit/2858d58a9458d430f97afc0647e7c1988083c233))

### Features

* **angular:** 升级至 v9.1.9 ([fb12760](https://github.com/codedance-top/ng-tangram/commit/fb12760ed246a40de04f7fb0e927960722adb846))
* **select:** 增加控制显示清除icon的 clearable 属性 ([7f134c6](https://github.com/codedance-top/ng-tangram/commit/7f134c60f97209374416639d18f410ed012dbbac))

# [0.7.0-beta.1](https://github.com/codedance-top/ng-tangram/compare/0.7.0-beta.0...0.7.0-beta.1) (2020-04-28)


### Bug Fixes

* **picture:** 修复无法读取图片预览图的问题 ([6002814](https://github.com/codedance-top/ng-tangram/commit/600281402df45fe24269189585274f136894a310))
* **upload:** 修复 upload 模块在 ivy 模式下编译错误的问题 ([ee4bc4e](https://github.com/codedance-top/ng-tangram/commit/ee4bc4ebaa3bebdbcdaadd5b14156ec6b89c0a7e))

# [0.7.0-beta.0](https://github.com/codedance-top/ng-tangram/compare/0.6.0...0.7.0-beta.0) (2020-04-27)


### Bug Fixes

* **pagination:** 修复更改 pageCount 属性时，页码高于计算之后的最大页数会出现错误的问题 ([f07ceca](https://github.com/codedance-top/ng-tangram/commit/f07cecae9ac5ba70ea074f52ac765506023f88c5))


### Features

* 支持 Ivy Renderer
* 优化 typescript 导入路径 ([cbdaa10](https://github.com/codedance-top/ng-tangram/commit/cbdaa1048779abe5b779d4e822a50a840903740c))
* **angular:** 支持 angular 9.1.x ([aef9223](https://github.com/codedance-top/ng-tangram/commit/aef92236f02ea6946ecbe744e3959b12f55fbeb7))
* **autocomplete:** 新增了 autocomplete 组件 ([d44ed3f](https://github.com/codedance-top/ng-tangram/commit/d44ed3f187ebce7a397405268a7e2466290abc52))
* **forms:** 新增内置验证器 ([e01f249](https://github.com/codedance-top/ng-tangram/commit/e01f249cfc8a1bfb15b2b4fcedc5356500b8d6c4))
* **overlay:** 支持 ivy render ([8c7beb3](https://github.com/codedance-top/ng-tangram/commit/8c7beb36c306d39c650739c3bbb9832f1b695dda))
* **pagination:** 样式采用自定义的方式，不再依赖 foundation, CssClass `pagination` => `nt-pagination` ([02bac13](https://github.com/codedance-top/ng-tangram/commit/02bac13f02e4968651c080561be232283c4b355a))



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

# [0.6.0-rc.4](https://github.com/codedance-top/ng-tangram/compare/0.6.0-rc.3...0.6.0-rc.4) (2020-01-08)

### Bug Fixes

* **markdown:** 修复 `NtMarkedEngine` 错误处理失败的问题 ([555cfd7](https://github.com/codedance-top/ng-tangram/commit/555cfd7857f6fb063ed545d90740b101a2e15f90))
* **table:** 修复 `nt-column` 会提示类型错误的问题 ([e075562](https://github.com/codedance-top/ng-tangram/commit/e07556222df3cd6e636d67751518907489b8a82e))

### Features

* **markdown:** 升级 `marked@^0.8.0`, `codemirror@^5.46.0` ([9da265b](https://github.com/codedance-top/ng-tangram/commit/9da265b1bdf75e2eea534534998b02d517b917f2))
* **style:** 升级到 `foundation-sites@6.6.1` ([0d31257](https://github.com/codedance-top/ng-tangram/commit/0d31257d33a5e81ff65e6b3e346a43a8ec0ba3a8))


# [0.6.0-rc.3](https://github.com/codedance-top/ng-tangram/compare/0.6.0-rc.2...0.6.0-rc.3) (2020-01-02)


### Bug Fixes

* **drawer:** 修复 drawer 在服务器端渲染时抛出异常的问题 ([d5bf646](https://github.com/codedance-top/ng-tangram/commit/d5bf646eea75b9be67ad06579e0977e01c785d3a))
* **markdown:** 修复 path 路径无法解析成文本内容的问题 ([d772353](https://github.com/codedance-top/ng-tangram/commit/d7723530a8339ad724c2cb0a5843d72b62e0ed82))
* **upload:** 修复 upload 异常捕捉失效的问题 ([50604a9](https://github.com/codedance-top/ng-tangram/commit/50604a95bb885ef445ff305b9a560d97615fc8e2))


### Features

* **angular:** 升级到 angular 9.0.0-rc.7 ([151ff95](https://github.com/codedance-top/ng-tangram/commit/151ff9507b7c13397f9e4316362fd2795210d4f5))

### BREAKING CHANGES

* **table:** 删除了 ntColumnCellDef, ntColumnHeaderDef, ntColumnFooterDef, nt-column-header, th[nt-column-header], nt-column-footer, td[nt-column-footer], nt-column-cell, td[nt-column-cell]

# [0.6.0-rc.2](https://github.com/codedance-top/ng-tangram/compare/0.6.0-rc...0.6.0-rc.2) (2019-11-26)

### Bug Fixes

* **overlay:** 修复 overlay 弹层关闭事件订阅时机不准确的问题 ([163bbd9](https://github.com/codedance-top/ng-tangram/commit/163bbd9dfeef8fb206556d3aa70797bdfc4232af))
* **overlay:** 修复了在嵌套 overlay 下点击子层内容时关闭父层的问题 ([e9b71ab](https://github.com/codedance-top/ng-tangram/commit/e9b71ab32405e0597b18085662eedd390a616685))
* **popconfirm:** 修复了在嵌套层级时 (其他 overlay容器嵌套 popconfirm) 时点击确定/取消会关闭父容器的问题 ([c58d96b](https://github.com/codedance-top/ng-tangram/commit/c58d96b3c46475e10c5f5603c01682a5164eb1bf))

### Features

* **animate:** 渐变动画增加节奏控制参数，现在可以使用 `animation-timing-function` 参数 ([1e1747f](https://github.com/codedance-top/ng-tangram/commit/1e1747f6dd87f951be52ef53f078c53660cccc79))
* **core:** 新增 fromOutsideElementClick 事件 ([bbd99c9](https://github.com/codedance-top/ng-tangram/commit/bbd99c93730528b4efab8a72febed7751164ccdc))
* **drawer:** 新增事件 afterOpen,afterClosed,beforeOpen,beforeClosed 方法 open(),close() ([9cb5324](https://github.com/codedance-top/ng-tangram/commit/9cb532458caa7ebf32f53ffae70468cef439154a))

### BREAKING CHANGES

* **drawer:** 移除 opened 属性，openedChange 和 outsideClick 事件

# [0.6.0-rc.1](https://github.com/codedance-top/ng-tangram/compare/0.6.0-rc.0...0.6.0-rc.1) (2019-11-22)

### Bug Fixes

* **attachment:** 修复 errors 数据类型错误的问题 ([fb64200](https://github.com/codedance-top/ng-tangram/commit/fb6420040c5af71a8a93645c0a612e3b4328d87e))
* **file:** 修复 `NtFileSelectDirective` 注入成服务的代码 ([54f773b](https://github.com/codedance-top/ng-tangram/commit/54f773baad97766ee4a9ee91a74f65c48b6d6f4d))
* **picture:** 修复 errors 数据类型错误的问题 ([4b22ffe](https://github.com/codedance-top/ng-tangram/commit/4b22ffe863d5ca254d1933eef79457b8b011543d))
* **table:** 修复构建时提示组件声明错误的问题 ([ad26706](https://github.com/codedance-top/ng-tangram/commit/ad267064b306f2c21600d5cf8bb06012aebe2eb7))


### Features

* **angular:** 更新 angular 9.0.0-rc.3 ([25866d8](https://github.com/codedance-top/ng-tangram/commit/25866d8a9dc2c3d779849b5d5e662346d38b5702))
* **markdown:** 新增 `~@ng-tangram/markdown/styles` 样式导入方式 ([286595b](https://github.com/codedance-top/ng-tangram/commit/286595b7e4a3151c0ebc4eb892022317837a862c))
* **upload:** 新增上传结果类型 `NtUploadEvent`, `NtUploadResponse`, `NtUploadError` ([fd9218f](https://github.com/codedance-top/ng-tangram/commit/fd9218f9143054f133c776abb74bb4c4e89bd715))


# [0.6.0-rc.0](https://github.com/codedance-top/ng-tangram/compare/0.4.0...0.6.0-rc.0) (2019-11-19)


### Bug Fixes

* **markdown-editor:** 修复了全屏模式切换时滚动位置不正确的问题 ([2435aba](https://github.com/codedance-top/ng-tangram/commit/2435aba291fc2c836ca0476fc0aed0e56d714239))
* **tree:** 修复了 angular cdk 9 的兼容性问题 ([83f84c4](https://github.com/codedance-top/ng-tangram/commit/83f84c483b6e88963fffd6afc564e2652cb8ae89))

### Features

* **attachment:** 新增了 attachment 模块（原 file 模块），通用代码已迁移至 NtFileModule ([651069e](https://github.com/codedance-top/ng-tangram/commit/651069ea57c290474abbcd91bb7e096831fc0c13))
* **components:** `datepicker` 不再基于 HTMLInputElement 元素，改用模拟方式 ([8427e42](https://github.com/codedance-top/ng-tangram/commit/8427e4215dc99d1295ed8efb155e5f8683ef9972))
* **core:** 新增 `nt-pseudo-input` 组件，用来模拟 input 元素的外观。 ([6cf0f41](https://github.com/codedance-top/ng-tangram/commit/6cf0f41d6dcbbf38e5d0356641731b8fc288694e))
* **core:** 新增了文件相关基础组件，NtFileSelectDirective, NtFileSizePipe ([3387db0](https://github.com/codedance-top/ng-tangram/commit/3387db0b7f21210e65f6953339549a3f4a5a8eab))
* **drawer:** 全新的 drawer 模块 ([871fb65](https://github.com/codedance-top/ng-tangram/commit/871fb657e88790d0a35c9bda7aafe9601144832b))
* **dropdown:** 改进在点击模式下需要点击两次才可以点击其他元素的问题 ([bf96abf](https://github.com/codedance-top/ng-tangram/commit/bf96abf5abc2cbed062a3c666665f4b8313b6bff))
* **global:** 支持 angular 9.0 和 APF 8.0 ([668a514](https://github.com/codedance-top/ng-tangram/commit/668a5145cf0b8c5f4c9628690126ea2ca6553f84))
* **markdown:** 新增 `NtMarkedEngineModule` ([ff5f928](https://github.com/codedance-top/ng-tangram/commit/ff5f9289c107e180e8ba94acd045ba1de1b9b141))
* **markdown:** 新增了 @ng-tangram/markdown 包，原 `pro` 包的 `markdown` 组件将会单独发布和维护 ([a0de206](https://github.com/codedance-top/ng-tangram/commit/a0de206d09e1a393341d6e28a932ebcdd7c6a413))
* **markdown:** 新增了 $nt-markdown-code-padding, $nt-markdown-pre-padding, $nt-markdown-pre-margin 参数 ([55c49f4](https://github.com/codedance-top/ng-tangram/commit/55c49f4d4c2fadf501530d213b76f6a896950b7a))
* **overlay:** 改进在 backdrop 模式下需要点击两次才可以点击其他元素的问题 ([345c0b5](https://github.com/codedance-top/ng-tangram/commit/345c0b5fe0d2293a7a76f755e429e748e26802c0))
* **overlay:** 新增了 overlayEnter，overlayLeave 事件 ([9308014](https://github.com/codedance-top/ng-tangram/commit/9308014f1590d4de103d333473157389aaf5a11a))
* **popconfirm:** 改进在窗口弹出的情况下需要点击两次才可以点击其他元素的问题 ([59114c2](https://github.com/codedance-top/ng-tangram/commit/59114c2d97f27af8eb1f6639dac7ccfb689c5dc1))
* **popover:** 改进在窗口弹出的情况下需要点击两次才可以点击其他元素的问题 ([07b5135](https://github.com/codedance-top/ng-tangram/commit/07b5135238e4e030e272a675ad944603cf5f3c36))
* **pseudo-input:** 新增 only-caret 样式 ([9769b5a](https://github.com/codedance-top/ng-tangram/commit/9769b5a7f014316aed2e813984942bf70b257d18))
* **upload:** 全新的 NtUploadModule ([84aefcf](https://github.com/codedance-top/ng-tangram/commit/84aefcf8a03f543843b6d32875b224d2474b4d49))
