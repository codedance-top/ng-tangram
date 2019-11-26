# [0.6.0-rc.2](https://github.com/livebridge-lab/ng-tangram/compare/0.6.0-rc...0.6.0-rc.2) (2019-11-26)

### Bug Fixes

* **overlay:** 修复 overlay 弹层关闭事件订阅时机不准确的问题 ([163bbd9](https://github.com/livebridge-lab/ng-tangram/commit/163bbd9dfeef8fb206556d3aa70797bdfc4232af))
* **overlay:** 修复了在嵌套 overlay 下点击子层内容时关闭父层的问题 ([e9b71ab](https://github.com/livebridge-lab/ng-tangram/commit/e9b71ab32405e0597b18085662eedd390a616685))
* **popconfirm:** 修复了在嵌套层级时 (其他 overlay容器嵌套 popconfirm) 时点击确定/取消会关闭父容器的问题 ([c58d96b](https://github.com/livebridge-lab/ng-tangram/commit/c58d96b3c46475e10c5f5603c01682a5164eb1bf))

### Features

* **animate:** 渐变动画增加节奏控制参数，现在可以使用 `animation-timing-function` 参数 ([1e1747f](https://github.com/livebridge-lab/ng-tangram/commit/1e1747f6dd87f951be52ef53f078c53660cccc79))
* **core:** 新增 fromOutsideElementClick 事件 ([bbd99c9](https://github.com/livebridge-lab/ng-tangram/commit/bbd99c93730528b4efab8a72febed7751164ccdc))
* **drawer:** 新增事件 afterOpen,afterClosed,beforeOpen,beforeClosed 方法 open(),close() ([9cb5324](https://github.com/livebridge-lab/ng-tangram/commit/9cb532458caa7ebf32f53ffae70468cef439154a))

### BREAKING CHANGES

* **drawer:** 移除 opened 属性，openedChange 和 outsideClick 事件

# [0.6.0-rc.1](https://github.com/livebridge-lab/ng-tangram/compare/0.6.0-rc.0...0.6.0-rc.1) (2019-11-22)

### Bug Fixes

* **attachment:** 修复 errors 数据类型错误的问题 ([fb64200](https://github.com/livebridge-lab/ng-tangram/commit/fb6420040c5af71a8a93645c0a612e3b4328d87e))
* **file:** 修复 `NtFileSelectDirective` 注入成服务的代码 ([54f773b](https://github.com/livebridge-lab/ng-tangram/commit/54f773baad97766ee4a9ee91a74f65c48b6d6f4d))
* **picture:** 修复 errors 数据类型错误的问题 ([4b22ffe](https://github.com/livebridge-lab/ng-tangram/commit/4b22ffe863d5ca254d1933eef79457b8b011543d))
* **table:** 修复构建时提示组件声明错误的问题 ([ad26706](https://github.com/livebridge-lab/ng-tangram/commit/ad267064b306f2c21600d5cf8bb06012aebe2eb7))


### Features

* **angular:** 更新 angular 9.0.0-rc.3 ([25866d8](https://github.com/livebridge-lab/ng-tangram/commit/25866d8a9dc2c3d779849b5d5e662346d38b5702))
* **markdown:** 新增 `~@ng-tangram/markdown/styles` 样式导入方式 ([286595b](https://github.com/livebridge-lab/ng-tangram/commit/286595b7e4a3151c0ebc4eb892022317837a862c))
* **upload:** 新增上传结果类型 `NtUploadEvent`, `NtUploadResponse`, `NtUploadError` ([fd9218f](https://github.com/livebridge-lab/ng-tangram/commit/fd9218f9143054f133c776abb74bb4c4e89bd715))


# [0.6.0-rc.0](https://github.com/livebridge-lab/ng-tangram/compare/0.4.0...0.6.0-rc.0) (2019-11-19)


### Bug Fixes

* **markdown-editor:** 修复了全屏模式切换时滚动位置不正确的问题 ([2435aba](https://github.com/livebridge-lab/ng-tangram/commit/2435aba291fc2c836ca0476fc0aed0e56d714239))
* **tree:** 修复了 angular cdk 9 的兼容性问题 ([83f84c4](https://github.com/livebridge-lab/ng-tangram/commit/83f84c483b6e88963fffd6afc564e2652cb8ae89))

### Features

* **attachment:** 新增了 attachment 模块（原 file 模块），通用代码已迁移至 NtFileModule ([651069e](https://github.com/livebridge-lab/ng-tangram/commit/651069ea57c290474abbcd91bb7e096831fc0c13))
* **components:** `datepicker` 不再基于 HTMLInputElement 元素，改用模拟方式 ([8427e42](https://github.com/livebridge-lab/ng-tangram/commit/8427e4215dc99d1295ed8efb155e5f8683ef9972))
* **core:** 新增 `nt-pseudo-input` 组件，用来模拟 input 元素的外观。 ([6cf0f41](https://github.com/livebridge-lab/ng-tangram/commit/6cf0f41d6dcbbf38e5d0356641731b8fc288694e))
* **core:** 新增了文件相关基础组件，NtFileSelectDirective, NtFileSizePipe ([3387db0](https://github.com/livebridge-lab/ng-tangram/commit/3387db0b7f21210e65f6953339549a3f4a5a8eab))
* **drawer:** 全新的 drawer 模块 ([871fb65](https://github.com/livebridge-lab/ng-tangram/commit/871fb657e88790d0a35c9bda7aafe9601144832b))
* **dropdown:** 改进在点击模式下需要点击两次才可以点击其他元素的问题 ([bf96abf](https://github.com/livebridge-lab/ng-tangram/commit/bf96abf5abc2cbed062a3c666665f4b8313b6bff))
* **global:** 支持 angular 9.0 和 APF 8.0 ([668a514](https://github.com/livebridge-lab/ng-tangram/commit/668a5145cf0b8c5f4c9628690126ea2ca6553f84))
* **markdown:** 新增 `NtMarkedEngineModule` ([ff5f928](https://github.com/livebridge-lab/ng-tangram/commit/ff5f9289c107e180e8ba94acd045ba1de1b9b141))
* **markdown:** 新增了 @ng-tangram/markdown 包，原 `pro` 包的 `markdown` 组件将会单独发布和维护 ([a0de206](https://github.com/livebridge-lab/ng-tangram/commit/a0de206d09e1a393341d6e28a932ebcdd7c6a413))
* **markdown:** 新增了 $nt-markdown-code-padding, $nt-markdown-pre-padding, $nt-markdown-pre-margin 参数 ([55c49f4](https://github.com/livebridge-lab/ng-tangram/commit/55c49f4d4c2fadf501530d213b76f6a896950b7a))
* **overlay:** 改进在 backdrop 模式下需要点击两次才可以点击其他元素的问题 ([345c0b5](https://github.com/livebridge-lab/ng-tangram/commit/345c0b5fe0d2293a7a76f755e429e748e26802c0))
* **overlay:** 新增了 overlayEnter，overlayLeave 事件 ([9308014](https://github.com/livebridge-lab/ng-tangram/commit/9308014f1590d4de103d333473157389aaf5a11a))
* **popconfirm:** 改进在窗口弹出的情况下需要点击两次才可以点击其他元素的问题 ([59114c2](https://github.com/livebridge-lab/ng-tangram/commit/59114c2d97f27af8eb1f6639dac7ccfb689c5dc1))
* **popover:** 改进在窗口弹出的情况下需要点击两次才可以点击其他元素的问题 ([07b5135](https://github.com/livebridge-lab/ng-tangram/commit/07b5135238e4e030e272a675ad944603cf5f3c36))
* **pseudo-input:** 新增 only-caret 样式 ([9769b5a](https://github.com/livebridge-lab/ng-tangram/commit/9769b5a7f014316aed2e813984942bf70b257d18))
* **upload:** 全新的 NtUploadModule ([84aefcf](https://github.com/livebridge-lab/ng-tangram/commit/84aefcf8a03f543843b6d32875b224d2474b4d49))
