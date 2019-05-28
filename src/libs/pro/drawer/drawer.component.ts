
import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export declare type NtDrawerExpandedFrom = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'nt-drawer',
  template: `
    <div class="nt-drawer-overlay {{expandFrom}}"
      [class.is-expanded]="expanded"
      [style.width]="isFromHorizontal() ? size : 'auto'"
      [style.height]="isFromVertical() ? size : 'auto'">
      <ng-content></ng-content>
    </div>
    <div *ngIf="expanded" class="nt-drawer-backdrop" (click)="expanded = false"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-drawer'
  }
})
export class NtDrawerComponent {

  private _expanded: boolean = false;

  @Output() open = new EventEmitter();

  @Output() expandedChange = new EventEmitter();

  @Input()
  get expanded() { return this._expanded; }
  set expanded(value: boolean) {
    this._expanded = coerceBooleanProperty(value);
    this.expandedChange.emit(this._expanded);

    if(this._expanded) {
      this.open.emit();
    }
  }

  private _size: string = '200px';

  @Input()
  get size() { return this._size; }
  set size(value: string) {
    this._size = value;
  }

  private _expandFrom: NtDrawerExpandedFrom = 'right';

  @Input()
  get expandFrom() { return this._expandFrom; }
  set expandFrom(value: NtDrawerExpandedFrom) {
    this._expandFrom = value;
  }

  isFromHorizontal() {
    return this.expandFrom === 'right' || this.expandFrom === 'left';
  }

  isFromVertical() {
    return this.expandFrom === 'top' || this.expandFrom === 'bottom';
  }
}
