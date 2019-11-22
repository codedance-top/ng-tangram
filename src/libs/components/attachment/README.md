## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 属性：服务器地址 | `string` | -
| name | 属性：文件名称 | `string` | -
| multiple | 属性：支持多文件上传 | `boolean` | true 1
| limitSize | 属性：文件大小限制 | `number` | 5(MB)
| disabled | 属性：是否禁用 | `boolean` | false
| accept | 属性：支持文件类型 | `string` | *(请参考 [HTMLInputElement](!https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement) [Accept](!https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept) 属性)
| error | 事件：错误时触发 | `function` | -
