import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ContentChildren, Directive, EventEmitter, Input, SimpleChanges, OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/operators/merge';

@Directive({
  selector: 'form[ntFormLabelWidth]',
})
export class NtFormLabelWidthDirective implements OnDestroy {

  private _width: number;

  @Input('ntFormLabelWidth')
  set width(value: number) {
    this._width = coerceNumberProperty(value, 0);
    if (this._width > 0) {
      this.widthChange.next(this._width);
    }
  }
  get width() { return this._width || 120; }

  widthChange = new EventEmitter<number>();

  ngOnDestroy() {
    this.widthChange.next();
    this.widthChange.complete();
  }
}
