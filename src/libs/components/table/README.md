## NtTableComponent `nt-table`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `Array<T>`、`DataSource<T>`、`Observable<T[]>` | - |
| trackBy | 数据源变化跟踪属性，类似 ngFor 的 trackBy | `function` | - |
| sortChange | 事件：排序时触发，列要设置成可排序列（sortable） | `($event: NtColumnSortChange) => void` | - |

## NtColumnDirective `nt-column`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 列名称 | `string` | - |
| sortable | 是否可排序，会触发 `NtTableComponent` 的 `sortChange` 事件 | `boolean` | `false` |
