export interface ExampleAsyncNode {
  expandable: boolean;
  name: string;
  level: number;
  loading?: boolean;
  isExpanded?: boolean;
  children?: ExampleAsyncNode[];
}
