## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 属性：提示语 | `string` | - |
| disabled | 属性：不可用状态 | `boolean` | `false` |
| required | 属性：必须输入标识（只在模板驱动表单有效） | `boolean` | `false` |
| readonly | 属性：只读 | `boolean` | `false` |
| startAt | 属性：每次弹出日期面板默认年月 | `date` | - |
| minDate | 属性：可选最小日期 | `date` | - |
| maxDate | 属性：可选最大日期 | `date` | - |
| dateFilter | 属性：过滤可选日期，此属性接收`<D> => boolean`的方法。| `function`  | - |
| afterOpen | 事件：日期选择面板打开后触发 | `function` | - |
| afterClosed | 事件：日期选择面板关闭后触发 | `function` | - |
| beforeOpen | 事件：日期选择面板打开前触发 | `function` | - |
| beforeClosed | 事件：日期选择面板关闭前触发 | `function` | - |

## 方法
| 参数 | 说明 | 参数 |
| --- | --- | --- |
| focus | 获取焦点 | - |
| select | 设置日期 | `date: Date` |
| clear | 置空日期 | - |
| setDisabledState | 设置禁用状态 | `isDisabled: boolean` |
