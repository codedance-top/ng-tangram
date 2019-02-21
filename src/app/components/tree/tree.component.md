
# Tree 树

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-tree-flat></demo-tree-flat>
      </nt-example-showcase>
      <nt-example-legend title="扁平结构的树">
        渲染的DOM树是扁平结构。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="flatCode"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="html" [code]="flatTemplate"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="scss" [code]="flatStyle"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <demo-tree-async></demo-tree-async>
      </nt-example-showcase>
      <nt-example-legend title="异步数据源">
        可以异步加载树的数据源。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="asyncCode"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
  <div class="medium-6 large-6 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-tree-nested></demo-tree-nested>
      </nt-example-showcase>
      <nt-example-legend title="嵌套结构的树">
        渲染的DOM树是嵌套式的，这种方式不需要 `ntTreeNodePadding`和`ntTreeNodePaddingIndent` 处理缩进，用样式就可以。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="nestedCode"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <demo-tree-checkbox></demo-tree-checkbox>
      </nt-example-showcase>
      <nt-example-legend title="Checkbox 选择">
        树结构的选择框。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="checkboxCode"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
  <div class="medium-12 large-12 cell">
    <nt-example>
      <nt-example-showcase>
        <demo-tree-table></demo-tree-table>
      </nt-example-showcase>
      <nt-example-legend title="表格形式的树">
        表格形式的树结构UI。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]=""></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="html"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="scss"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
</div>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
