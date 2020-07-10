import { Subject } from 'rxjs';

import { Directive, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

export declare type NtFormOrientation = 'vertical' | 'horizontal';

@Directive({
  selector: 'form[ntFormOrientation]',
})
export class NtFormOrientationDirective implements OnDestroy, OnChanges {

  private readonly _orientationChange = new Subject<NtFormOrientation>();

  private _orientation: NtFormOrientation;

  @Input('ntFormOrientation')
  get orientation() { return this._orientation; }
  set orientation(value: NtFormOrientation) {
    this._orientation = value;
    this._orientationChange.next(this._orientation);
  }

  get orientationChange() {
    return this._orientationChange.asObservable();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.orientation;
    if (change.currentValue !== change.previousValue) {
      this._orientationChange.next(change.currentValue);
    }
  }

  ngOnDestroy() {
    this._orientationChange.complete();
  }
}
