import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.fixed]': 'fixed'
  }
})
export class HeaderComponent {

  private _fixed = false;

  @Input()
  get fixed() { return this._fixed; }
  set fixed(value: boolean) {
    this._fixed = coerceBooleanProperty(value);
  }
}
