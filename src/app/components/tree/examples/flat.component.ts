import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { NtTreeFlatDataSource, NtTreeFlattener } from '@ng-tangram/components/tree';

import { ExampleTreeNode, TREE_DATA } from './data';

@Component({
  selector: 'example-tree-flat',
  templateUrl: 'flat.component.html',
  styleUrls: ['flat.component.scss']
})
export class ExampleTreeFlatComponent {

  // 树组件的控制器，负责管理树的各种状态
  treeControl = new FlatTreeControl<ExampleTreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NtTreeFlattener<ExampleTreeNode, ExampleTreeNode>(
    node => node,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NtTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild(_: number, node: ExampleTreeNode) {
    return node.expandable;
  }

  isExpanded(node: ExampleTreeNode) {
    return this.treeControl.isExpanded(node);
  }
}
