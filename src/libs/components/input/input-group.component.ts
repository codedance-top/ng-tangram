import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nt-input-group, [nt-input-group]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-input-group input-group',
    '[class.nt-input-group-transparent]': 'transparent'
  }
})
export class NtInputGroupComponent {

  private _transparent: boolean = false;

  @Input()
  set transparent(value: boolean) { this._transparent = coerceBooleanProperty(value); }
  get transparent() { return this._transparent; }
}

