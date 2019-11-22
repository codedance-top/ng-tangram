import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';

export class NtTreeNestedDataSource<T> extends DataSource<T> {
  _data = new BehaviorSubject<T[]>([]);

  get data() { return this._data.value; }
  set data(value: T[]) { this._data.next(value); }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return merge(...[collectionViewer.viewChange, this._data])
      .pipe(map(() => this.data));
  }

  disconnect() {
    // no op
  }
}

