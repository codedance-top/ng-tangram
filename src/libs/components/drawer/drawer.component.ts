import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnimationEvent, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {
  fromOutsideClick,
  fromOutsideTouch,
  slideInDown,
  slideInLeft,
  slideInRight,
  slideInUp,
  slideOutDown,
  slideOutLeft,
  slideOutRight,
  slideOutUp
} from '@ng-tangram/components/core';

export declare type NtDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface NtDrawerContainer {
  readonly element: HTMLElement;
}

export const NT_DRAWER_CONTAINER = new InjectionToken<NtDrawerContainer>('nt-drawer-container');

const ANIMATION_TIMING = 0.4;

let uniqueId = 0;

@Component({
  selector: 'nt-drawer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition('closed => left', slideInLeft(ANIMATION_TIMING)),
      transition('closed => right', slideInRight(ANIMATION_TIMING)),
      transition('closed => top', slideInUp(ANIMATION_TIMING)),
      transition('closed => bottom', slideInDown(ANIMATION_TIMING)),
      transition('left => closed', slideOutLeft(ANIMATION_TIMING)),
      transition('right => closed', slideOutRight(ANIMATION_TIMING)),
      transition('top => closed', slideOutUp(ANIMATION_TIMING)),
      transition('bottom => closed', slideOutDown(ANIMATION_TIMING))
    ])
  ],
  host: {
    'class': 'nt-drawer',
    '[class.opened]': 'state !== "closed"',
    '[class.backdrop]': 'backdrop',
    '[@slide]': 'state',
    '(@slide.start)': 'onAnimationStart($event)',
    '(@slide.done)': 'onAnimationDone($event)',
  }
})
export class NtDrawerComponent implements AfterViewInit, OnDestroy {

  readonly id: string = `nt-drawer-${uniqueId++}`;

  private _destory = new Subject();

  private _outsideActionSubscription: Subscription | null;

  private _container: Element;

  private _backdropElement: Element | null;

  private _backdrop = false;

  @Input()
  get backdrop() { return this._backdrop; }
  set backdrop(value: boolean) {
    this._backdrop = coerceBooleanProperty(value);
    if (this._backdrop) {
      this._createBackdropOverlay();
    } else {
      this._removeBackdropOverlay();
    }
  }

  private _placement: NtDrawerPlacement;

  @Input()
  get placement() { return this._placement; }
  set placement(value: NtDrawerPlacement) {
    this._changePlacementAndStyles(value);
  }

  private _touchmode: boolean = false;

  @Input()
  get touchmode() { return this._touchmode; }
  set touchmode(value: boolean) {
    this._touchmode = coerceBooleanProperty(value);
  }

  state: 'closed' | NtDrawerPlacement = 'closed';

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _element: ElementRef,
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Optional() @Inject(NT_DRAWER_CONTAINER) container: NtDrawerContainer) {

    if (isPlatformBrowser(_platformId)) {
      this._initContainerAndStyles(container);
    }
    this._changePlacementAndStyles('left');
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    if (isPlatformBrowser(this._platformId)) {
      this._renderer.removeClass(this._container, `${this.id}-container`);
    }
    this._destory.next();
    this._destory.complete();
    this._unsubscribeOutsideActionEvent();
  }

  open() {
    this.state = this.placement;
  }

  close() {
    this.state = 'closed';
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState !== 'closed') {
      this._subscribeOutsideActionEvent();
      this.afterOpen.emit();
    } else {
      this.afterClosed.emit();
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.fromState === 'void') {
      return;
    }

    if (event.toState === 'closed') {
      this._unsubscribeOutsideActionEvent();
      this._disattachBackdropOverlay();
      this.beforeClosed.emit();
    } else {
      this._attachBackdropOverlay();
      this.beforeOpen.emit();
    }
  }

  /** 调整方向的样式属性 */
  private _changePlacementAndStyles(placement: NtDrawerPlacement) {
    if (this._placement) {
      this._renderer.removeClass(this._element.nativeElement, this._placement);
    }
    this._renderer.addClass(this._element.nativeElement, this._placement = placement);
  }

  /** 设置容器的样式 */
  private _initContainerAndStyles(container: NtDrawerContainer) {
    this._container = container ? container.element : document.body;
    if (this._container !== document.body) {
      this._renderer.addClass(this._element.nativeElement, 'nested');
    }
    this._renderer.addClass(this._container, `${this.id}-container`);
  }

  /** 创建遮罩层元素对象，当 backdrop 属性是 true 的时候才会创建 */
  private _createBackdropOverlay() {
    this._backdropElement = this._renderer.createElement('div');
    this._renderer.addClass(this._backdropElement, 'nt-drawer-backdrop');
    this._renderer.addClass(this._backdropElement, `${this.id}-backdrop`);
  }

  /** 删除遮罩层元素对象，当 backdrop 属性是 false 时会执行这一操作 */
  private _removeBackdropOverlay() {
    this._disattachBackdropOverlay();
    this._backdropElement = null;
  }

  /** 将创建好的遮罩层添加到 区域元素内（默认为 body 元素） */
  private _attachBackdropOverlay() {
    if (this.backdrop && this._backdropElement) {
      this._renderer.appendChild(this._container, this._backdropElement);
      this._renderer.addClass(this._container, 'nt-drawer-scrollblock');
    }
  }

  /** 将区域元素内（默认为 body 元素）的遮罩层移除 */
  private _disattachBackdropOverlay() {
    if (this._backdropElement) {
      this._renderer.removeChild(this._container, this._backdropElement);
      this._renderer.removeClass(this._container, 'nt-drawer-scrollblock');
    }
  }

  /** 开始外部事件的订阅 */
  private _subscribeOutsideActionEvent() {
    const outsideAction = this.touchmode ? fromOutsideTouch : fromOutsideClick;
    this._outsideActionSubscription = outsideAction([this._element.nativeElement], this._container)
      .pipe(takeUntil(this._destory))
      .subscribe(_ => this.close());
  }

  /** 取消外部事件的订阅 */
  private _unsubscribeOutsideActionEvent() {
    if (this._outsideActionSubscription) {
      this._outsideActionSubscription.unsubscribe();
      this._outsideActionSubscription = null;
    }
  }
}
