import { Subject } from 'rxjs';

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'form[ntFormLabelWidth]',
})
export class NtFormLabelWidthDirective implements OnChanges, OnDestroy {

  private readonly _widthChange = new Subject<number>();

  private _width: number = 120;

  @Input('ntFormLabelWidth')
  get width() { return this._width; }
  set width(value: number) {
    this._width = coerceNumberProperty(value, 120);
  }

  get widthChange() { return this._widthChange.asObservable(); }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.width;
    if (change.currentValue !== change.previousValue) {
      console.log(change.currentValue);
      this._widthChange.next(change.currentValue);
    }
  }

  ngOnDestroy() {
    this._widthChange.complete();
  }
}
