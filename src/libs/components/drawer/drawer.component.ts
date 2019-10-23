import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
import { fromOutsideClick } from '@ng-tangram/components/core';

export declare type NtDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface NtDrawerContainer {
  readonly element: HTMLElement;
}

export const NT_DRAWER_CONTAINER = new InjectionToken<NtDrawerContainer>('nt-drawer-container');

let uniqueId = 0;

@Component({
  selector: 'nt-drawer',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nt-drawer',
    '[class.opened]': 'opened',
    '[class.backdroped]': 'backdrop'
  }
})
export class NtDrawerComponent implements AfterViewInit, OnDestroy {

  readonly id: string = `nt-drawer-${uniqueId++}`;

  private _destory = new Subject();

  private _outsideClickSubscription: Subscription;

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
    this._changePlacementValueAndStyle(value);
  }

  private _opened: boolean;

  @Input()
  get opened() { return this._opened; }
  set opened(value: boolean) {
    const coerceValue = coerceBooleanProperty(value);
    if (coerceValue) {
      this._subscribeOutsideClickEvent();
    } else {
      this._unsubscribeOutsideClickEvent();
    }
    this._setOpenedValueAndEmit(coerceValue);
  }

  @Output() openedChange = new EventEmitter();

  @Input() size: number;

  constructor(
    private _element: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(NT_DRAWER_CONTAINER) container: NtDrawerContainer) {

    if (isPlatformBrowser(platformId)) {
      this._initContainerAndStyles(container);
    }
    this._changePlacementValueAndStyle('left');
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this._destory.next();
    this._destory.complete();
    this._renderer.removeClass(this._container, `${this.id}-container`);
    this._unsubscribeOutsideClickEvent();
  }

  private _changePlacementValueAndStyle(placement: NtDrawerPlacement) {
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
    if (this._backdropElement) {
      this._renderer.appendChild(this._container, this._backdropElement);
    }
  }

  /** 将区域元素内（默认为 body 元素）的遮罩层移除 */
  private _disattachBackdropOverlay() {
    if (this._backdropElement) {
      this._renderer.removeChild(this._container, this._backdropElement);
    }
  }

  /** 设置展开 */
  private _setOpenedValueAndEmit(opened: boolean) {
    this.openedChange.emit(this._opened = opened);
  }

  /** 开始点击事件的订阅 */
  private _subscribeOutsideClickEvent() {
    this._outsideClickSubscription = fromOutsideClick([this._element.nativeElement], this._container)
      .pipe(takeUntil(this._destory))
      .subscribe(() => this._setOpenedValueAndEmit(false));

    if (this.backdrop) {
      this._attachBackdropOverlay();
    }
  }

  /** 取消点击事件的订阅 */
  private _unsubscribeOutsideClickEvent() {
    if (this._outsideClickSubscription) {
      this._outsideClickSubscription.unsubscribe();
    }

    if (this.backdrop) {
      this._disattachBackdropOverlay();
    }
  }
}
