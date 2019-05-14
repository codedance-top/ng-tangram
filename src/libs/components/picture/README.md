## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 属性：服务器地址 | `string` | -
| name | 属性：图片名称 | `string` | -
| maxFiles | 属性：图片数量 | `number` | 1
| maxSize | 属性：图片最大容量 | `number` | 5(MB)
| readonly | 属性：是否只读 | `boolean` | false
| disabled | 属性：是否禁用 | `boolean` | false
| accept | 属性：支持图片类型 | `image/jpeg`、`image/jpg`、`image/png`、`image/gif`、`image/bmp` | *
| error | 事件：错误时触发 | `function` | -
