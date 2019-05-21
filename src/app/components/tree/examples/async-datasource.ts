import { DataSource, CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Observable, merge, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { ExampleAsyncNode } from "./async-models";

//
export class AsyncDataSource extends DataSource<ExampleAsyncNode> {

  dataChange = new BehaviorSubject<ExampleAsyncNode[]>([]);

  get data(): ExampleAsyncNode[] { return this.dataChange.value; }
  set data(value: ExampleAsyncNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<ExampleAsyncNode>) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<ExampleAsyncNode[]> {
    this.treeControl.expansionModel.changed!.subscribe(change => {
      if ((change as SelectionChange<ExampleAsyncNode>).added || (change as SelectionChange<ExampleAsyncNode>).removed) {
        this.handleTreeControl(change as SelectionChange<ExampleAsyncNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect() {
    // this.removedNodesMap.clear();
  }

  handleTreeControl(change: SelectionChange<ExampleAsyncNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  toggleNode(node: ExampleAsyncNode, expand: boolean) {
    const index = this.data.indexOf(node);
    if (index < 0 || node.loading) { // If no children, or cannot find the node, no op
      return;
    }

    if (expand) {
      node.loading = true;
    } else {
      let count = 0;
      for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++ , count++) { }
      this.dataChange.next(this.data);
    }
  }
}
