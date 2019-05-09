
文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

<div class="grid-x grid-margin-x">
  <div class="medium-12 cell">
    <nt-example>
      <nt-example-showcase>
        <example-tree-flat></example-tree-flat>
      </nt-example-showcase>
      <nt-example-legend title="扁平结构的树">
        扁平化的DOM结构树，配合 `ntTreeNodePadding` 和 `ntTreeNodePaddingIndent` 指令可以控制缩紧距离。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="flatCode"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="html" [code]="flatTemplate"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="scss" [code]="flatStyle"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-tree-async></example-tree-async>
      </nt-example-showcase>
      <nt-example-legend title="异步数据源">
        加载异步数据。
      </nt-example-legend>
      <nt-example-code-tabs>
      <nt-example-code-tabs-panel lang="ts" [code]="asyncCode"></nt-example-code-tabs-panel>
      <nt-example-code-tabs-panel lang="html" [code]="asyncTemplate"></nt-example-code-tabs-panel>
      <nt-example-code-tabs-panel lang="scss" [code]="asyncStyle"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
  <div class="medium-12 cell">
    <nt-example>  
      <nt-example-showcase>
        <example-tree-nested></example-tree-nested>
      </nt-example-showcase>
      <nt-example-legend title="嵌套结构的树">
        嵌套的DOM结构树，与**扁平结构树**不同，这种方式用样式来实现缩进效果。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="nestedCode"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="html" [code]="nestedTemplate"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="scss" [code]="nestedStyle"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
    <nt-example>
      <nt-example-showcase>
        <example-tree-checkbox></example-tree-checkbox>
      </nt-example-showcase>
      <nt-example-legend title="Checkbox 选择">
        树结构的选择框。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="checkboxCode"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="html" [code]="checkboxTemplate"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="scss" [code]="checkboxStyle"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
  <div class="medium-12 large-12 cell">
    <nt-example>
      <nt-example-showcase>
        <example-tree-table></example-tree-table>
      </nt-example-showcase>
      <nt-example-legend title="表格形式的树">
        tree 也可以跟 table 结合使用。
      </nt-example-legend>
      <nt-example-code-tabs>
        <nt-example-code-tabs-panel lang="ts" [code]="tableCode"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="html" [code]="tableTemplate"></nt-example-code-tabs-panel>
        <nt-example-code-tabs-panel lang="scss" [code]="tableStyle"></nt-example-code-tabs-panel>
      </nt-example-code-tabs>
    </nt-example>
  </div>
</div>

<nt-markdown-block [data]="api"></nt-markdown-block>
