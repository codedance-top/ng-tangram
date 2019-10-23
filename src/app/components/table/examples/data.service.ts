import { of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObservableDataService {

  private persons: any = of([
    { name: 'Dave', age: 34, salary: 2000 },
    { name: 'Nick', age: 37, salary: 32000 },
    { name: 'Howie', age: 40, salary: 26000 },
    { name: 'Brian', age: 40, salary: 30000 },
    { name: 'Kevin', age: 47, salary: 24000 },
  ]);

  constructor() { }

  getPersons() {
    return this.persons.pipe(
      delay(3000)
    );
  }

}
