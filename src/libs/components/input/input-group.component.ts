import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component, EventEmitter, HostListener, Input, ViewEncapsulation, ElementRef, ContentChild, AfterContentChecked
} from '@angular/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

@Component({
  selector: 'nt-input-group, [nt-input-group]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-input-group input-group',
    '[class.nt-input-group-transparent]': 'transparent'
  }
})
export class NtInputGroupComponent<T> implements AfterContentChecked {
  private _transparent: boolean = false;

  @ContentChild(NtFormFieldControl) field: NtFormFieldControl<T>;

  @Input()
  set transparent(value: boolean) { this._transparent = coerceBooleanProperty(value); }
  get transparent() { return this._transparent; }

  constructor() { }

  ngAfterContentChecked() {

  }
}

