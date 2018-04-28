import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ContentChildren, Directive, EventEmitter, Input, QueryList, SimpleChanges, OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/operators/merge';

export declare type NtFormOrientation = 'vertical' | 'horizontal';

@Directive({
  selector: 'form[ntFormOrientation]',
})
export class NtFormOrientationDirective implements OnDestroy {

  private _orientation: NtFormOrientation;

  @Input('ntFormOrientation')
  set orientation(value: NtFormOrientation) {
    this._orientation = value;
    this.orientationChange.next(this._orientation);
  }
  get orientation() { return this._orientation; }

  orientationChange = new EventEmitter<NtFormOrientation>();

  ngOnDestroy() {
    this.orientationChange.next();
    this.orientationChange.complete();
  }
}
