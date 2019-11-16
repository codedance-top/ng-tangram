import { Subject, Subscription, SubscriptionLike } from 'rxjs';
import { debounceTime, filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { AnimationEvent, transition, trigger } from '@angular/animations';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { fadeIn, fadeOut } from '../animate/fading';
import { fromOutsideClick } from '../events/click';
import {
  getPositionClassName,
  NT_OVERLAY_POSITION_PAIRS,
  NtOverlayPosition
} from './overlay-positions';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NtOverlayComponent implements AfterViewInit, AfterContentChecked, OnChanges, OnDestroy {

  private readonly _destroy = new Subject<void>();

  private _closeEvent = new EventEmitter<any>();

  private _positionChange = new EventEmitter<string>();

  private _locationChanges: SubscriptionLike = Subscription.EMPTY;

  private _outsideClickSubscription: Subscription | null;

  private _opened = false;

  get opened() { return this._opened; }

  private _isMouseIn = false;

  get isMouseIn() { return this._isMouseIn; }

  private _origin: CdkOverlayOrigin;

  @Input()
  set origin(value: CdkOverlayOrigin) { this._origin = value; }
  get origin() { return this._origin; }

  private _position: NtOverlayPosition = NtOverlayPosition.BottomLeft;

  @Input()
  set position(value: NtOverlayPosition) {
    if (value) {
      this._position = value;
      this._positionPairs = NT_OVERLAY_POSITION_PAIRS[value];
    } else {
      this._position = NtOverlayPosition.BottomLeft;
    }
  }

  private _positionPairs: ConnectionPositionPair[] = NT_OVERLAY_POSITION_PAIRS[this._position];

  @Input()
  set positionPairs(value: ConnectionPositionPair[]) { this._positionPairs = coerceArray(value); }
  get positionPairs() { return this._positionPairs; }

  private _paddingClass = getPositionClassName(this._positionPairs[0]);

  get paddingClass() { return this._paddingClass; }

  private _fixed = false;

  @Input()
  set fixed(value: boolean) { this._fixed = coerceBooleanProperty(value); }
  get fixed() { return this._fixed; }

  private _arrow = false;

  @Input()
  set arrow(value: boolean) { this._arrow = coerceBooleanProperty(value); }
  get arrow() { return this._arrow; }

  private _nospacing = false;

  @Input()
  set nospacing(value: boolean) { this._nospacing = coerceBooleanProperty(value); }
  get nospacing() { return this._nospacing; }

  private _trigger: NtOverlayTriggerType = '';

  @Input()
  set trigger(value: NtOverlayTriggerType) { this._trigger = value; }
  get trigger() { return this._trigger; }

  private _overlayClass = '';

  @Input()
  set overlayClass(value: string) { this._overlayClass = value; }
  get overlayClass() { return this._overlayClass; }

  private _backdrop = false;

  @Input()
  get backdrop() { return this._backdrop; }
  set backdrop(value: boolean) { this._backdrop = coerceBooleanProperty(value); }

  @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @Output() keydownEvents = new EventEmitter<KeyboardEvent>();

  constructor(
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() location: Location) {

    this._closeEvent.
      pipe(
        takeUntil(this._destroy),
        debounceTime(100),
        filter(_ => this._isMouseIn === false)
      ).
      subscribe(_ => this.hide());

    this._positionChange.
      pipe(
        takeUntil(this._destroy),
        filter(position => position !== this._paddingClass)
      ).
      subscribe(position => this._setContainerStyles(position));

    if (location) {
      this._locationChanges = location.subscribe(() => this.hide());
    }
  }

  ngAfterViewInit() {
    this.cdkConnectedOverlay.attach
      .pipe(
        take(1),
        switchMap(() => this.cdkConnectedOverlay.overlayRef.keydownEvents()),
        takeUntil(this._destroy)
      )
      .subscribe(event => {
        if (event.keyCode === ESCAPE) {
          this.hide();
        }
        this.keydownEvents.next(event);
      });

    this.cdkConnectedOverlay.attach
      .pipe(takeUntil(this._destroy), filter(() => this.trigger === 'click'))
      .subscribe(() => this._subscribeOutsideClickEvent());

    this.cdkConnectedOverlay.detach
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this._unsubscribeOutsideClickEvent());
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.position || changes.fixed || changes.positionPairs;
    if (change && !change.firstChange) {
      this._setPosition();
    }
  }

  ngAfterContentChecked() {

  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this._locationChanges.unsubscribe();
  }

  private _setPosition() {
    this._positionPairs = this.fixed ?
      this._positionPairs.slice(0, 1) :
      this._positionPairs;

    this._paddingClass = getPositionClassName(this._positionPairs[0]);
  }

  /** 开始点击事件的订阅 */
  private _subscribeOutsideClickEvent() {
    if (!this._outsideClickSubscription) {
      this._outsideClickSubscription = fromOutsideClick([
        this.cdkConnectedOverlay.overlayRef.overlayElement,
        this.origin.elementRef.nativeElement
      ])
        .pipe(takeUntil(this._destroy))
        .subscribe(() => {
          this.hide();
        });
    }
  }

  /** 取消点击事件的订阅 */
  private _unsubscribeOutsideClickEvent() {
    if (this._outsideClickSubscription) {
      this._outsideClickSubscription.unsubscribe();
      this._outsideClickSubscription = null;
    }
  }

  show() {
    this._opened = true;
    this._changeDetectorRef.markForCheck();
  }

  hide() {
    this._opened = false;
    this._changeDetectorRef.markForCheck();
  }

  toggle() {
    if (this.trigger === 'click') {
      this.opened ? this.hide() : this.show();
    }
  }

  onOverlayPositionChange(event: ConnectedOverlayPositionChange) {
    this._positionChange.next(getPositionClassName(event.connectionPair));
  }

  onMouseEnter(_: Event) {
    if (this.trigger === 'hover') {
      this._isMouseIn = true;
      this.show();
    }
  }

  onMouseLeave(_: Event) {
    if (this.trigger === 'hover') {
      this._closeEvent.next(this._isMouseIn = false);
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === null) {
      this.beforeOpen.next();
    } else if (event.toState === 'void') {
      this.beforeClosed.next();
    }
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === null) {
      this.afterOpen.next();
    } else if (event.toState === 'void') {
      this.afterClosed.next();
    }
  }

  private _setContainerStyles(position: any) {
    const pane = this.cdkConnectedOverlay.overlayRef.overlayElement.querySelector('.nt-overlay-container');
    this._paddingClass && this._renderer.removeClass(pane, this._paddingClass);
    this._paddingClass = position;
    this._renderer.addClass(pane, this._paddingClass);
  }
}
