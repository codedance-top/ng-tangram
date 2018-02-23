
import { Component, Input, Output, ElementRef, EventEmitter, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '../overlay';

import { AnimationEvent, trigger, transition } from '@angular/animations';
import { fadeIn, fadeOut } from '../../animate/fading';

@Component({
  selector: '[nt-popconfirm]',
  template: `
  <ng-content></ng-content>
  <nt-overlay
    [ntOrigin]="_origin"
    [ntPosition]="_positions"
    ntTriggerType="click" ntArrowVisibled>
    <nt-dropdown-pane>
      <p class="popconfirm"><nt-ant-icon class="popconfirm-icon" ntType="infocirlce"></nt-ant-icon> {{ _title }}</p>
      <div class="popconfirm-action">
        <button nt-button ntColor="secondary" ntSize="tiny" (click)="onCancel()">取消</button>
        <button nt-button ntSize="tiny" (click)="onOk()">确认</button>
      </div>
    </nt-dropdown-pane>
  </nt-overlay>
  `,
  styleUrls: ['popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': '_overlay.onClick()'
  }
})
export class NtPopConfirmComponent {

  _title = '';
  _origin: OverlayOrigin;
  _positions = 'top';

  @Output('ntOnOk') _onOk = new EventEmitter<any>();
  @Output('ntOnCancel') _onCancel = new EventEmitter<any>();

  @ViewChild(NtOverlayComponent) _overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this._origin = new OverlayOrigin(_elementRef);
  }

  @Input('ntTitle')
  set title(value: string) {
    this._title = value;
  }

  @Input('ntPosition')
  set position(value: NtOverlayPosition) {
    this._positions = value;
  }

  onOk() {
    this._onOk.emit();
    this._overlay.hide();
  }

  onCancel() {
    this._onCancel.emit();
    this._overlay.hide();
  }
}
