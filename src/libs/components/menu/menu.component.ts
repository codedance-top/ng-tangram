import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit, Component, ContentChildren, Input, QueryList, ViewEncapsulation
} from '@angular/core';

export declare type NtMenuAlign = '' | 'center' | 'right';
export declare type NtMenuOrientation = '' | 'horizontal' | 'vertical';

@Component({
  selector: '[nt-menu]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["menu", align ? "align-" + align : "", orientation].join(" ")',
    '[class.simple]': 'simple',
    '[class.expanded]': 'expanded',
    '[class.nested]': 'nested'
  }
})
export class NtMenuComponent implements AfterContentInit {

  private _simple: boolean = false;
  private _expanded: boolean = false;
  private _nested: boolean = false;
  private _align: NtMenuAlign = '';

  @Input()
  set simple(value: boolean) { this._simple = coerceBooleanProperty(value); }
  get simple() { return this._simple; }

  @Input()
  set expanded(value: boolean) { this._expanded = coerceBooleanProperty(value); }
  get expanded() { return this._expanded; }

  set nested(value: boolean) { this._nested = coerceBooleanProperty(value); }
  get nested() { return this._nested; }

  @Input()
  set align(value: NtMenuAlign) { this._align = value; }
  get align() { return this._align; }

  @Input() orientation: NtMenuOrientation = '';

  @ContentChildren(NtMenuComponent) childMenus: QueryList<NtMenuComponent>;

  constructor() { }

  ngAfterContentInit() {
    this.childMenus.toArray()
      .filter(menu => menu !== this)
      .forEach(menu => menu.nested = true);
  }
}
