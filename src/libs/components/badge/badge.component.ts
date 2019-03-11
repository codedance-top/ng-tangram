import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnDestroy, PLATFORM_ID, Renderer2,
  ViewEncapsulation
} from '@angular/core';

export declare type NtBadgeType = '' | 'static' | 'float' | 'notify';

@Component({
  selector: 'nt-badge, [nt-badge]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["badge", color, class].join(" ")',
    '[class.badge-float]': 'type === "float"',
    '[class.badge-notify]': 'type === "notify"'
  }
})
export class NtBadgeComponent implements AfterViewInit, OnDestroy {

  private _type: NtBadgeType = 'static';

  @Input() color: string = '';

  /**
   * 定义此属性是为了避免内部的动态样式 class 和外部设置的值起冲突，所以用此属性接收外部的值并且合并 class 来避免这个问题。
   *
   * TODO: 官方会在 Ivy Renderer 中修复这个问题，预计会在 Angular 9.0。
   * 有关此问题的Issue: https://github.com/angular/angular/issues/7289
   * @deprecated > 0.6.0
   */
  @Input() class: string = '';

  @Input()
  set type(value: NtBadgeType) {
    if (value === 'float' || value === 'notify') {
      this._resetPosition();
    } else {
      this._clearPosition();
    }
    this._type = value;
  }
  get type() { return this._type; }

  private _originalPosition;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _elementRef: ElementRef,
    private _renderer: Renderer2) { }

  ngAfterViewInit() {
    this._resetPosition();
  }

  ngOnDestroy() {
    this._clearPosition();
  }

  // 重置容器的 position 属性
  private _resetPosition() {
    if (isPlatformBrowser(this.platformId)) {
      const style = window.getComputedStyle(this._elementRef.nativeElement.parentElement);
      if (style.position !== 'absolute' || style.position !== 'absolute') {
        this._originalPosition = style.position;
        this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'position', 'relative');
      }
    }
  }

  // 清理 position 属性
  private _clearPosition() {
    if (isPlatformBrowser(this.platformId)) {
      if (this._originalPosition) {
        this._renderer.removeStyle(this._elementRef.nativeElement.parentElement, 'position');
      }
    }
  }
}
