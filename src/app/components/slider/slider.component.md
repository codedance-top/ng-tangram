可拖拽的输入框

## 何时使用

* 当输入项是数字类型，且需要在限定范围取值时。

> 如：在国内去买鞋👟时尺码通常使用欧洲的标准码（35, 36, 37, ... ,44），在这种情况下<br>
> 如果使用普通输入框不会有太好的体验，代码也会变得冗余，因此滚动输入框很适合此类场景下使用。

## 代码演示
<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-slider-basic></example-slider-basic>
      </nt-example-showcase>
      <nt-example-legend title="基本">默认滚动条，取之区间为 0 - 100</nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-minmax></example-slider-minmax>
      </nt-example-showcase>
      <nt-example-legend title="最小值和最大值">可以通过设定 min 和 max 属性来限定范围</nt-example-legend>
      <nt-example-code [code]="minmaxCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-range></example-slider-range>
      </nt-example-showcase>
      <nt-example-legend title="选择区间">* 将type属性设为 range 时会出现2个拖拽条，可以选择一个区间范围，返回 [number, number] 类型的数据</nt-example-legend>
      <nt-example-code [code]="rangeCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-slider-step></example-slider-step>
      </nt-example-showcase>
      <nt-example-legend title="步伐">设定步伐</nt-example-legend>
      <nt-example-code [code]="stepCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-stepmark></example-slider-stepmark>
      </nt-example-showcase>
      <nt-example-legend title="步伐标记">显示的提示每个步伐的值，在密集的数据范围中不建议使用此项</nt-example-legend>
      <nt-example-code [code]="stepmarkCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-events></example-slider-events>
      </nt-example-showcase>
      <nt-example-legend title="事件"></nt-example-legend>
      <nt-example-code [code]="eventsCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>


