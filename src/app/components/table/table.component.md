
# 表格 DataTable

## 何时使用

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-12 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-table-basic></example-table-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">默认表格</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-table-sort></example-table-sort>
      </nt-example-showcase>
      <nt-example-legend title="可排序表格">
        如果想对列进行排序操作，可以使用 sortable 属性将列设置为可拍序列，
        然后可以订阅 `NtTableComponent` 的 `sortChange` 事件，排序方式变化时会传递 `NtColumnSortChange` 类型的参数。
      </nt-example-legend>
      <nt-example-code [code]="sortCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-12 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-table-alternate></example-table-alternate>
      </nt-example-showcase>
      <nt-example-legend title="自定义表格">对于不想用 原生 table 的时候可以用自定义表格。</nt-example-legend>
      <nt-example-code [code]="alternateCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-table-column-visibility></example-table-column-visibility>
      </nt-example-showcase>
      <nt-example-legend title="列可见性">
        通过 `nt-row` columns 可以设置需要显示的列
      </nt-example-legend>
      <nt-example-code [code]="columnVisibilityCode"></nt-example-code>
    </nt-example>
  </div>
</div>

## API

### NtTableComponent `nt-table`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `Array<T>`、`DataSource<T>`、`Observable<T[]>` | - |
| trackBy | 数据源变化跟踪属性，类似 ngFor 的 trackBy | `function` | - |
| sortChange | 事件：排序时触发，列要设置成可排序列（sortable） | `($event: NtColumnSortChange) => void` | - |

### NtColumnDirective `nt-column`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 列名称 | `string` | - |
| sortable | 是否可排序，会触发 `NtTableComponent` 的 `sortChange` 事件 | `boolean` | `false` |
