# 2018-04-12
bug: 表单模块验证信息适配器不能在根模块注入的问题。
bug: loading 样式冲突。

# 0.x.x 计划
NtCollapseComponent
NtAudioComponent
NtImageComponent

# 0.3.x 计划
NtRadioComponent
NtCheckboxComponent
NtMapComponent
NtMapInputComponent


# 0.2.x 计划
NtUploader
NtFileComponent
NtTabsComponent
NtProgressComponent
Menu Dropdown 指令

# 2018-02-01
组件代码的 scss(非.component.scss) 文件在server编译时会出错，原因是服务器编译时缺少ExtractTextPlugin插件。
服务器编译时不需要重新输出 css 代码，只在 browser 编译时输出即可。


# 将来要增加的 组件/特性 ? 代表未确定是否会开发
Avatar ?
Collapse
Checkbox
Radio
Map
Notification
Menu Dropdown 指令
Toast
Rating

ImageUploader + ImagePreviewService
AudioUploader + AudioPlayer
FileUploader FileExpFilter
Tabs
ClockPicker 基于开源库 http://weareoutman.github.io/clockpicker/