
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, Overlay, ConnectionPositionPair, OverlayOrigin } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OVERLAY_POSITIONS, NtOverlayPosition, getPositionClassName } from './overlay-positions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import { trigger, transition, AnimationEvent } from '@angular/animations';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

export declare type NtOverlayTriggerType = '' | 'hover' | 'click';

@Component({
  selector: 'nt-overlay, [nt-overlay]',
  templateUrl: 'overlay.component.html',
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.15)),
      transition('* => void', fadeOut(.15))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class NtOverlayComponent {

  private _isOpen = false;
  private _isMouseIn = false;

  private _origin: OverlayOrigin;
  private _position: NtOverlayPosition = 'bottomLeft';
  private _positionPairs = OVERLAY_POSITIONS[this._position];
  private _paddingClass = getPositionClassName(this._positionPairs[0]);
  private _arrowVisibled = false;
  private _noSpacing = false;
  private _triggerType: NtOverlayTriggerType = '';
  private _overlayClass = '';
  private _fixed = false;

  private _closeEvent = new EventEmitter<any>();
  private _positionChange = new EventEmitter<string>();

  get isOpen() { return this._isOpen; }
  get isMouseIn() { return this._isMouseIn; }

  @Input()
  set origin(value: OverlayOrigin) { this._origin = value; }
  get origin() { return this._origin; }

  @Input()
  set position(value: NtOverlayPosition) { this._position = value; this._setPosition(); }
  get positions() { return this._positionPairs; }

  get paddingClass() { return this._paddingClass; }

  @Input()
  set fixed(value: boolean) { this._fixed = coerceBooleanProperty(value); this._setPosition(); }
  get fixed() { return this._fixed; }

  @Input()
  set arrowVisibled(value: boolean) { this._arrowVisibled = coerceBooleanProperty(value); }
  get arrowVisibled() { return this._arrowVisibled; }

  @Input()
  set noSpacing(value: boolean) { this._noSpacing = coerceBooleanProperty(value); }
  get noSpacing() { return this._noSpacing; }

  @Input()
  set triggerType(value: NtOverlayTriggerType) { this._triggerType = value; }
  get triggerType() { return this._triggerType; }

  @Input()
  set overlayClass(value: string) { this._overlayClass = value; }
  get overlayClass() { return this._overlayClass; }

  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;

  @Output() onShow = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<any>();
  @Output() onPositionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {

    this._closeEvent
      .debounceTime(100)
      .filter(_ => this._isMouseIn === false)
      .subscribe(_ => this.hide());

    this._positionChange
      .filter(position => position !== this._paddingClass)
      .subscribe((position: any) => {

        const pane = this.cdkConnectedOverlay.overlayRef.overlayElement.querySelector('.nt-overlay-container');
        this._paddingClass && this._renderer.removeClass(pane, this._paddingClass);
        this._paddingClass = position;
        this._renderer.addClass(pane, this._paddingClass);
      });
  }

  private _setPosition() {
    this._positionPairs = this.fixed ?
      OVERLAY_POSITIONS[this._position].slice(0, 1) :
      OVERLAY_POSITIONS[this._position];

    this._paddingClass = getPositionClassName(this._positionPairs[0]);
  }

  private getPosition(value: NtOverlayPosition) {
    return this.fixed ? OVERLAY_POSITIONS[value].slice(0, 1) : OVERLAY_POSITIONS[value];
  }

  show() {
    this._isOpen = true;
    this.onShow.next();
  }

  hide() {
    this._isOpen = false;
    this.onClose.next();
  }

  click() {
    if (this.triggerType === 'click') {
      this.isOpen ? this.hide() : this.show();
    }
  }

  onOverlayPositionChange(event: ConnectedOverlayPositionChange) {
    this._positionChange.next(getPositionClassName(event.connectionPair));
  }

  onMouseEnter() {
    if (this.triggerType === 'hover') {
      this._isMouseIn = true;
      this.show();
    }
  }

  onMouseLeave() {
    if (this.triggerType === 'hover') {
      this._closeEvent.next(this._isMouseIn = false);
    }
  }
}
