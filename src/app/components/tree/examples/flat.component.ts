import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { NtTreeFlatDataSource, NtTreeFlattener } from '@ng-tangram/components/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
  children?: ExampleFlatNode[];
}

const TREE_DATA: ExampleFlatNode[] = [
  {
    name: '北京', expandable: true, level: 0, children: [
      { name: '东城区', expandable: false, level: 1 },
      { name: '西城区', expandable: false, level: 1 },
      { name: '朝阳区', expandable: false, level: 1 },
    ]
  },
  {
    name: '辽宁', expandable: true, level: 0, children: [
      {
        name: '沈阳', expandable: true, level: 1, children: [
          { name: '和平区', expandable: false, level: 2 },
          { name: '沈河区', expandable: false, level: 2 }
        ]
      },
      {
        name: '大连', expandable: true, level: 1, children: [
          { name: '中山区', expandable: false, level: 2 },
          { name: '西岗区', expandable: false, level: 2 },
          { name: '沙河口区', expandable: false, level: 2 },
          { name: '甘井子区', expandable: false, level: 2 }
        ]
      }
    ]
  }
];

@Component({
  selector: 'example-tree-flat',
  templateUrl: 'flat.component.html',
  styleUrls: ['flat.component.scss']
})
export class ExampleTreeFlatComponent {

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NtTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NtTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  isExpanded(node: ExampleFlatNode) {
    return this.treeControl.isExpanded(node);
  }

  private transformer(node: ExampleFlatNode, level: number) {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
}
