用于显示数据行

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-12 cell">
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
  <div class="medium-12 cell">
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
  <div class="medium-12 cell">
   <nt-example>
      <nt-example-showcase>
        <example-table-selectable></example-table-selectable>
      </nt-example-showcase>
      <nt-example-legend title="可选择列表">
        通过 引入 `SelectionModel` 配合 `NtCheckboxModule` 实现列表选中效果
      </nt-example-legend>
      <nt-example-code [code]="selectableCode"></nt-example-code>
    </nt-example>
  </div>
</div>


## API
<nt-markdown-block [data]="api"></nt-markdown-block>
