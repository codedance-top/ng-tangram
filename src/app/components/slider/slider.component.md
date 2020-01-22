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
      <nt-example-legend title="基本">
        默认滚动条，取之区间为 0 - 100，每次移动的间隔为1。
      </nt-example-legend>
      <nt-example-code [code]="basicCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-minmax></example-slider-minmax>
      </nt-example-showcase>
      <nt-example-legend title="最小值和最大值">
        可以通过设定 `min` 和 `max` 属性来限定范围
      </nt-example-legend>
      <nt-example-code [code]="minmaxCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-range></example-slider-range>
      </nt-example-showcase>
      <nt-example-legend title="选择区间">
        将 `type` 属性设为 `range` 时会出现2个拖拽条，可以选择一个区间范围，返回 `[number, number]` 类型的数据
      </nt-example-legend>
      <nt-example-code [code]="rangeCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-forms></example-slider-forms>
      </nt-example-showcase>
      <nt-example-legend title="表单中使用">
        slider 组件基于 angular 表单体系构建，因此很容易将它与 `FormsModule` 和 `ReactiveFormsModule` 结合使用。
      </nt-example-legend>
      <nt-example-code [code]="formsCode"></nt-example-code>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <example-slider-step></example-slider-step>
      </nt-example-showcase>
      <nt-example-legend title="步伐">
        组件每次移动一个单位的间隔，称之为步伐(step)，适用于需要选择某个值的倍数等场景。
      </nt-example-legend>
      <nt-example-code [code]="stepCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-stepmark></example-slider-stepmark>
      </nt-example-showcase>
      <nt-example-legend title="步伐标记">
        标记步伐所在的位置，这适用于步伐间隔宽度足够的场景下，密集时并不推荐开启此属性。
      </nt-example-legend>
      <nt-example-code [code]="stepmarkCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-events></example-slider-events>
      </nt-example-showcase>
      <nt-example-legend title="事件">
        组件中有两个值改变的事件，一种为值真正改变时发生(点击以及已结束拖拽行为)，另一种在拖拽行为还未结束时发出，频繁的值改变对于表单来说价值并不大。
      </nt-example-legend>
      <nt-example-code [code]="eventsCode"></nt-example-code>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-slider-vertical></example-slider-vertical>
      </nt-example-showcase>
      <nt-example-legend title="竖型">
        <!-- 组件中有两个值改变的事件，一种为值真正改变时发生(点击以及已结束拖拽行为)，另一种在拖拽行为还未结束时发出，频繁的值改变对于表单来说价值并不大。 -->
      </nt-example-legend>
      <nt-example-code [code]="verticalCode"></nt-example-code>
    </nt-example>
  </div>
</div>

<div>
  <nt-markdown [data]="api"></nt-markdown>
</div>


