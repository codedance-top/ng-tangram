
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, Overlay, ConnectionPositionPair, OverlayOrigin } from '@angular/cdk/overlay';
import { OVERLAY_POSITIONS, getPositionOrientation, NtOverlayOrientation, NtOverlayPosition } from './overlay-positions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import { trigger, transition, AnimationEvent } from '@angular/animations';
import { fadeIn, fadeOut } from '../../animate/fading';

export declare type NtOverlayTriggerType = '' | 'hover' | 'click';

@Component({
  selector: 'nt-overlay, [nt-overlay]',
  template: `
    <ng-template
      cdk-connected-overlay
      [cdkConnectedOverlayOpen]="_isOpen"
      [cdkConnectedOverlayHasBackdrop]="_triggerType === 'click'"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOrigin]="_origin"
      (positionChange)="onPositionChange($event)"
      (backdropClick)="hide()">
      <div class="nt-overlay-container {{_paddingClass}} {{_overlayClass}}"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        [@fade]>
        <div class="nt-overlay-shadow"></div>
        <div class="nt-overlay-arrow" *ngIf="_arrowVisibled"></div>
        <div class="nt-overlay-pane">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>`,
  animations: [
    trigger('fade', [
      transition('void => *', fadeIn(.15)),
      transition('* => void', fadeOut(.15))
    ])
  ],
  styleUrls: ['overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NtOverlayComponent {

  _origin: OverlayOrigin;
  _positions = OVERLAY_POSITIONS.bottomLeft;
  _isOpen = false;
  _isMouseIn = false;
  _arrowVisibled = false;
  _paddingClass = 'start-bottom-start-top';
  _triggerType: NtOverlayTriggerType = '';
  _overlayClass = '';

  _closeEvent = new EventEmitter<any>();
  _positionChanged = new EventEmitter<string>();

  @ViewChild(CdkConnectedOverlay) _cdkConnectedOverlay: CdkConnectedOverlay;
  @Output('ntOnPositionChange') _onPositionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {

    this._closeEvent
      .debounceTime(100)
      .filter(_ => this._isMouseIn === false)
      .subscribe(_ => this._isOpen = false);

    this._positionChanged
      .filter(position => position !== this._paddingClass)
      .subscribe((position: any) => {

        const pane = this._cdkConnectedOverlay.overlayRef.overlayElement.querySelector('.nt-overlay-container');
        this._paddingClass && this._renderer.removeClass(pane, this._paddingClass);
        this._paddingClass = position;
        this._renderer.addClass(pane, this._paddingClass);
      });
  }

  @Input('ntOrigin')
  set origin(value: OverlayOrigin) {
    this._origin = value;
  }

  @Input('ntPosition')
  set position(value: NtOverlayPosition) {
    this._positions = OVERLAY_POSITIONS[value];
    const pair = this._positions[0];
    this._paddingClass = `${pair.originX}-${pair.originY}-${pair.overlayX}-${pair.overlayY}`;
  }

  @Input('ntArrowVisibled')
  set arrowVisibled(value: boolean) {
    this._arrowVisibled = value === false ? false : true;
  }

  @Input('ntTriggerType')
  set triggerType(value: NtOverlayTriggerType) {
    this._triggerType = value;
  }

  @Input('ntOverlayClass')
  set overlayClass(value: string) {
    this._overlayClass = value;
  }


  show() {
    this._isOpen = true;
  }

  hide() {
    this._isOpen = false;
  }

  onClick() {
    if (this._triggerType === 'click') {
      this._isOpen = !this._isOpen;
    }
  }

  onPositionChange(event: ConnectedOverlayPositionChange) {
    const pair = event.connectionPair;
    this._positionChanged.next(`${pair.originX}-${pair.originY}-${pair.overlayX}-${pair.overlayY}`);
  }

  onMouseEnter() {
    if (this._triggerType === 'hover') {
      this._isMouseIn = true;
      this._isOpen = true;
    }
  }

  onMouseLeave() {
    if (this._triggerType === 'hover') {
      this._closeEvent.next(this._isMouseIn = false);
    }
  }
}
