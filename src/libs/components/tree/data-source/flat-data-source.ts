import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';

export class NtTreeFlattener<T, F> {

  constructor(
    public transformFunction: (node: T, level: number) => F,
    public getLevel: (node: F) => number,
    public isExpandable: (node: F) => boolean,
    public getChildren: (node: T) => Observable<T[]> | T[]) { }

  _flattenNode(node: T, level: number, resultNodes: F[], parentMap: boolean[]): F[] {
    const flatNode = this.transformFunction(node, level);
    resultNodes.push(flatNode);

    if (this.isExpandable(flatNode)) {
      const childrenNodes = this.getChildren(node);
      if (Array.isArray(childrenNodes)) {
        this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
      } else {
        childrenNodes.pipe(take(1)).subscribe(children => {
          this._flattenChildren(children, level, resultNodes, parentMap);
        });
      }
    }
    return resultNodes;
  }

  _flattenChildren(children: T[], level: number, resultNodes: F[], parentMap: boolean[]): void {
    children.forEach((child, index) => {
      let childParentMap: boolean[] = parentMap.slice();
      childParentMap.push(index !== children.length - 1);
      this._flattenNode(child, level + 1, resultNodes, childParentMap);
    });
  }

  flattenNodes(structuredData: T[]): F[] {
    let resultNodes: F[] = [];
    structuredData.forEach(node => this._flattenNode(node, 0, resultNodes, []));
    return resultNodes;
  }

  expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F>): F[] {
    let results: F[] = [];
    let currentExpand: boolean[] = [];
    currentExpand[0] = true;

    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= this.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (this.isExpandable(node)) {
        currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }
}

export class NtTreeFlatDataSource<T, F> extends DataSource<F> {

  _flattenedData = new BehaviorSubject<F[]>([]);
  _expandedData = new BehaviorSubject<F[]>([]);

  _data: BehaviorSubject<T[]>;

  get data() { return this._data.value; }
  set data(value: T[]) {
    this._data.next(value);
    this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
    this.treeControl.dataNodes = this._flattenedData.value;
  }

  constructor(
    private treeControl: FlatTreeControl<F>,
    private treeFlattener: NtTreeFlattener<T, F>,
    initialData: T[] = []) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
  }

  connect(collectionViewer: CollectionViewer): Observable<F[]> {
    const changes = [
      collectionViewer.viewChange,
      this.treeControl.expansionModel.changed,
      this._flattenedData
    ];
    return merge(...changes).pipe(map(() => {
      this._expandedData.next(
        this.treeFlattener.expandFlattenedNodes(this._flattenedData.value, this.treeControl)
      );
      return this._expandedData.value;
    }));
  }

  disconnect() { }
}
