import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';

import { ExampleTreeNode, TREE_DATA } from './data';

@Component({
  selector: 'example-tree-nested',
  templateUrl: 'nested.component.html',
  styleUrls: ['nested.component.scss']
})
export class ExampleTreeNestedComponent {

  treeControl = new NestedTreeControl<ExampleTreeNode>(node => node.children);

  dataSource = TREE_DATA;

  hasChild(_: number, node: ExampleTreeNode) {
    return node.expandable;
  }

  isExpanded(node: ExampleTreeNode) {
    return this.treeControl.isExpanded(node);
  }
}
