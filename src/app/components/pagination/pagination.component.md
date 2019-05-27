

## 何时使用

* 当加载/渲染所有数据将花费很多时间时；
* 可切换页码浏览数据。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-pagination-basic></example-pagination-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">基础分页</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
      <nt-example>
        <nt-example-showcase>
          <example-pagination-more></example-pagination-more>
        </nt-example-showcase>
        <nt-example-legend title="更多">更多分页</nt-example-legend>
        <nt-example-code [code]="moreCode"></nt-example-code>
      </nt-example>
    </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 数据总数 | `number` | - |
| pageIndex | 当前页数，可双向绑定 | `number` | 1 |
| pageSize | 每页条数 ，可双向绑定 | `number` | 10 |

## 方法  

| 参数 | 说明 | 默认值 |
| --- | --- | --- | --- |
| pageChange | 当前页数改变时回调 | - |
