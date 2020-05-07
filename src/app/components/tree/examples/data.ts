export interface ExampleTreeNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
  children?: ExampleTreeNode[];
}

export const TREE_DATA: ExampleTreeNode[] = [
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
