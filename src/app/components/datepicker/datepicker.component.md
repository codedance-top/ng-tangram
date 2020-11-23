## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码演示

### 日期选择器 DatePicker

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-basic></example-datepicker-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">最简单的用法，在弹出日期面板中可以选择日期。</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-filter></example-datepicker-filter>
      </nt-example-showcase>
      <nt-example-legend title="可选日期设置">可用 `dateFilter` 设置弹出日期面板中可选日期。</nt-example-legend>
      <nt-example-code [code]="filterCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-change></example-datepicker-change>
      </nt-example-showcase>
      <nt-example-legend title="选择面板事件">可用 `afterOpen`、`afterClosed`、`beforeOpen`、`beforeClosed` 监听日期选择面板打开前后、关闭前后事件。</nt-example-legend>
      <nt-example-code [code]="changeCode"></nt-example-code>
    </nt-example>
    
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-start></example-datepicker-start>
      </nt-example-showcase>
      <nt-example-legend title="日期面板默认年月设置">可用 `startAt` 设置每次弹出日期面板默认年月。</nt-example-legend>
      <nt-example-code [code]="startCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-boundary></example-datepicker-boundary>
      </nt-example-showcase>
      <nt-example-legend title="范围设置">可用 `minDate` 或 `maxDate` 分别设置可选最小日期或可选最大日期。</nt-example-legend>
      <nt-example-code [code]="boundaryCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-moment></example-datepicker-moment>
      </nt-example-showcase>
      <nt-example-legend title="Moment">
      使用 `NtMomentDateModule` 模块。<br>
      注意：此案例加入Module只用于演示，推荐的导入方式是在 `app.module.ts` 预先导入日期模块。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel title="Component" lang="ts" [code]="momentCode"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel title="Module" lang="ts" [code]="momentModuleCode"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
</div>

### 日期范围选择器 DateRangePicker

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-range></example-datepicker-range>
        <example-datepicker-forms></example-datepicker-forms>
      </nt-example-showcase>
      <nt-example-legend title="日期范围选择器">选择一个区间的日期值，值将会以 `&#123; state: D, end: D &#125;` 结构返回。</nt-example-legend>
      <nt-example-code [code]="rangeCode"></nt-example-code>
    </nt-example>
  </div>
    <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-datepicker-range-strategy></example-datepicker-range-strategy>
      </nt-example-showcase>
      <nt-example-legend title="选择策略">可以自定义选择策略，这里使用内置的 `WEEKLY_NT_CALENDAR_RANGE_STRATEGY_PROVIDER` 选择策略。</nt-example-legend>
      <nt-example-code [code]="rangeStrategyCode"></nt-example-code>
    </nt-example>
  </div>
</div>

### 日期适配器 DateAdapter

日期相关的组件需要导入日期适配器模块，组件库中默认实现了2种适配器，需要在根模块(`AppModule`)中导入其中之一或自定义的适配器。

| 模块 | 日期类型  | 依赖 | 从哪里导入 |
| --- | --- | --- | --- |
| `NtNativeDateModule` | `Date` | 不需要 | `@ng-tangram/components/core` |
| `NtMomentDateModule` | `Moment` | Moment.js | `@ng-tangram/moment-adapter` |

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div> 

