import { Injectable } from "@angular/core";
import { Observable, of as observableOf } from "rxjs";
import { ExampleAsyncNode } from "./async-models";

@Injectable()
export class AsyncDatabase {
  getChildren(parentNode: ExampleAsyncNode): Observable<ExampleAsyncNode[]> {
    return observableOf(
      [1, 2, 3].map(no => ({
        name: `${parentNode.name}-children${no}`,
        level: parentNode.level + 1,
        expandable: true
      }))
    );
  }
}
