import { Directive, EventEmitter, Input, OnDestroy } from '@angular/core';

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
