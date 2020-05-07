import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  DOWN_ARROW,
  END,
  hasModifierKey,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  UP_ARROW
} from '@angular/cdk/keycodes';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  BOTTOM_CENTER,
  LEFT_CENTER,
  NtOverlayComponent,
  RIGHT_CENTER,
  TOP_CENTER
} from '@ng-tangram/components/overlay';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

const activeEventOptions: AddEventListenerOptions = { passive: false };

export class NtSliderChange {
  value: number;
  source: NtSliderComponent;
}

interface NtSliderStepmark {
  value: number;
  percent: number;
}

@Component({
  selector: 'nt-slider',
  exportAs: 'ntSlider',
  templateUrl: 'slider.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)',
    '(keyup)': '_onKeyup()',
    '(mouseenter)': '_onMouseenter()',
    '(selectstart)': '$event.preventDefault()',

    'class': 'nt-slider',
    'role': 'slider',
    '[tabIndex]': 'tabIndex',
    '[class.is-sliding]': '_isSliding',
    '[class.vertical]': 'vertical',
    '[class.invert]': 'invert'
  },
  providers: [
    { provide: NtFormFieldControl, useExisting: NtSliderComponent, multi: true }
  ]
})
export class NtSliderComponent extends NtFormFieldControl<number> implements ControlValueAccessor, OnInit, OnDestroy {

  tabIndex: number;

  private _min = 0;

  @Input()
  get min() { return this._min; }
  set min(value: number) {
    this._min = coerceNumberProperty(value, this._max);

    if (this._value === null) {
      this.value = this._min;
    }

    this._percent = this._calculatePercentage(this._value);
    this._changeDetectorRef.markForCheck();
  }

  private _max = 100;

  @Input()
  get max() { return this._max; }
  set max(value: number) {
    this._max = coerceNumberProperty(value, this._min);

    this._percent = this._calculatePercentage(this._value);
    this._changeDetectorRef.markForCheck();
  }

  private _step = 1;

  @Input()
  get step() { return this._step; }
  set step(value: number) {
    this._step = coerceNumberProperty(value, this._step);
    if (this._step % 1 !== 0) {
      this._roundToDecimal = this._step.toString().split('.').pop()!.length;
    }
    this._changeDetectorRef.markForCheck();
  }

  private _value: number | null = null;

  @Input()
  get value() {
    if (this._value === null) {
      this.value = this._min;
    }
    return this._value;
  }
  set value(value: number | null) {
    if (value !== this._value) {
      let _value = coerceNumberProperty(value);

      if (this._roundToDecimal) {
        _value = parseFloat(_value.toFixed(this._roundToDecimal));
      }

      this._value = this._clamp(_value, this.min, this.max);
      this._percent = this._calculatePercentage(this._value);
      this._changeDetectorRef.markForCheck();
    }
  }

  private _percent: number = 0;

  get percent(): number { return this._clamp(this._percent); }

  get displayValue() {
    if (this._roundToDecimal && this.value && this.value % 1 !== 0) {
      return this.value.toFixed(this._roundToDecimal);
    }
    return this.value || 0;
  }

  private _disabled = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _invert = false;

  @Input()
  get invert(): boolean { return this._invert; }
  set invert(value: boolean) {
    this._invert = coerceBooleanProperty(value);
  }

  private _stepmark = false;

  @Input()
  get stepmark() { return this._stepmark; }
  set stepmark(value: boolean) {
    this._stepmark = coerceBooleanProperty(value);
    if (this._stepmark) {
      this._stepmarkValues = this._calculateStepmarks();
    } else {
      this._stepmarkValues = [];
    }
  }

  private _vertical: boolean = false;

  @Input()
  get vertical() { return this._vertical; }
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }

  @Output() readonly change: EventEmitter<NtSliderChange> = new EventEmitter<NtSliderChange>();

  @Output() readonly input: EventEmitter<NtSliderChange> = new EventEmitter<NtSliderChange>();

  @Output() readonly valueChange: EventEmitter<number | null> = new EventEmitter<number | null>();

  @ViewChild('sliderHandle', { static: true, read: ElementRef }) _sliderHandle: ElementRef;

  @ViewChild(NtOverlayComponent, { static: true }) _overlay: NtOverlayComponent;

  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  private _sliderDimensions: ClientRect | null = null;

  private _roundToDecimal: number;

  private _valueOnSlideStart: number | null;

  private _pointerPositionOnStart: { x: number, y: number } | null;

  private _lastPointerEvent: MouseEvent | TouchEvent | null;

  protected _document?: Document;

  _origin: CdkOverlayOrigin;

  _isSliding: boolean = false;

  _isActive: boolean = false;

  _stepmarkValues: NtSliderStepmark[] = [];

  get _trackFillStyles() {
    let sizeValue = this.percent * 100;
    return !this.vertical
      ? { width: `${sizeValue}%` }
      : { height: `${sizeValue}%` };
  }

  get _trackHandleStyles() {
    const offsetValue = this.percent * 100;

    if (!this.vertical) {
    return !this.invert
      ? { left: `${offsetValue}%` }
      : { right: `${offsetValue}%` };
    } else {
      return { top: `${offsetValue}%` }
    }
  }

  get _trackTootipPosition() {
    return !this.vertical
     ? [TOP_CENTER, BOTTOM_CENTER]
     : [LEFT_CENTER, RIGHT_CENTER]
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
    @Inject(DOCUMENT) document: any,
    @Attribute('tabindex') tabIndex: string,
    @Self() @Optional() public ngControl: NgControl,
    private _ngZone: NgZone
  ) {
    super();

    this._document = document;

    this.tabIndex = parseInt(tabIndex) || 0;

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this._ngZone.runOutsideAngular(() => {
      const element = _elementRef.nativeElement;
      element.addEventListener('mousedown', this._pointerDown, activeEventOptions);
      element.addEventListener('touchstart', this._pointerDown, activeEventOptions);
    });
  }

  ngOnInit() {
    this._origin = new CdkOverlayOrigin(this._sliderHandle);

    this._focusMonitor
      .monitor(this._elementRef, true)
      .subscribe((origin: FocusOrigin) => {
        this._isActive = !!origin && origin !== 'keyboard';
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    const element = this._elementRef.nativeElement;
    element.removeEventListener('mousedown', this._pointerDown, activeEventOptions);
    element.removeEventListener('touchstart', this._pointerDown, activeEventOptions);
  }

  writeValue(obj: any) {
    if (this.disabled) {
      return;
    }
    this.value = obj;
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  focus(options?: FocusOptions) {
    this._focusHostElement(options);
  }

  blur() {
    this._blurHostElement();
  }

  _onMouseenter() {
    if (this.disabled) {
      return;
    }

    this._sliderDimensions = this._getSliderDimensions();
  }

  _onFocus() {
    this._sliderDimensions = this._getSliderDimensions();
  }

  _onBlur() {
    this._onTouched();
  }

  _onKeydown(event: KeyboardEvent) {
    if (this.disabled || hasModifierKey(event)) {
      return;
    }

    const oldValue = this.value;

    switch (event.keyCode) {
      case PAGE_UP:
        this._increment(10);
        break;
      case PAGE_DOWN:
        this._increment(-10);
        break;
      case END:
        this.value = this.max;
        break;
      case HOME:
        this.value = this.min;
        break;
      case LEFT_ARROW:
        this._increment(-1);
        break;
      case UP_ARROW:
        this._increment(1);
        break;
      case RIGHT_ARROW:
        this._increment(1);
        break;
      case DOWN_ARROW:
        this._increment(-1);
        break;
      default:
        return;
    }

    if (oldValue != this.value) {
      this._emitInputEvent();
      this._emitChangeEvent();
    }

    this._isSliding = true;
    event.preventDefault();
  }

  _onKeyup() {
    this._isSliding = false;
  }

  _shouldInvertMouseCoords() {
    return !this.vertical ? this.invert : !this.invert;
  }

  _trackStepmarkStyles(stepmark: NtSliderStepmark) {
    if (!this.vertical) {
      return !this.invert
        ? { left: `${stepmark.percent}%` }
        : { right: `${stepmark.percent}%` };
    } else {
      return { top: `${stepmark.percent}%` };
    }
  }

  private _increment(numSteps: number) {
    this.value = this._clamp((this.value || 0) + this.step * numSteps, this.min, this.max);
  }

  private _getSliderDimensions() {
    return this._elementRef.nativeElement.getBoundingClientRect();
  }

  private _pointerDown = (event: TouchEvent | MouseEvent) => {
    if (this.disabled || this._isSliding || (!isTouchEvent(event) && event.button !== 0)) {
      return;
    }

    this._ngZone.run(() => {
      const oldValue = this.value;
      const pointerPosition = getPointerPositionOnPage(event);

      // TODO: 在点击行为发生时（从用户的意图上），同步设置为滑动模式时过渡效果不会出现，因此将状态的改变交给下一次变更检测期
      setTimeout(() => this._isSliding = true);
      this._lastPointerEvent = event;
      event.preventDefault();
      this._focusHostElement();
      this._onMouseenter();
      this._bindGlobalEvents(event);
      this._focusHostElement();
      this._updateValueFromPosition(pointerPosition);
      this._valueOnSlideStart = this.value;
      this._pointerPositionOnStart = pointerPosition;

      if (oldValue != this.value) {
        this._emitInputEvent();
        this._emitChangeEvent();
      }
    });
  }

  private _pointerMove = (event: TouchEvent | MouseEvent) => {
    if (this._isSliding) {
      event.preventDefault();
      const oldValue = this.value;
      this._lastPointerEvent = event;
      this._updateValueFromPosition(getPointerPositionOnPage(event));

      if (oldValue != this.value) {
        this._emitInputEvent();
      }

      this._overlay.markOpen();
      this._overlay.forceUpdatePosition()
    }
  }

  private _pointerUp = (event: TouchEvent | MouseEvent) => {

    if (this._isSliding) {
      const pointerPositionOnStart = this._pointerPositionOnStart;
      const currentPointerPosition = getPointerPositionOnPage(event);

      event.preventDefault();
      this._removeGlobalEvents();
      this._valueOnSlideStart = this._pointerPositionOnStart = this._lastPointerEvent = null;
      this._isSliding = false;

      if (
        this._valueOnSlideStart !== this.value &&
        !this.disabled && (
          pointerPositionOnStart?.x !== currentPointerPosition.x ||
          pointerPositionOnStart?.y !== currentPointerPosition.y
        )
      ) {
        this._emitChangeEvent();
      }
    }

    this._overlay.markClose();
  }

  private _updateValueFromPosition(pos: { x: number, y: number }) {
    if (!this._sliderDimensions) {
      return;
    }

    let offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
    let size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
    let posComponent = this.vertical ? pos.y : pos.x;

    let percent = this._clamp((posComponent - offset) / size);

    if (this._shouldInvertMouseCoords()) {
      percent = 1 - percent;
    }

    if (percent === 0) {
      this.value = this.min;
    } else if (percent === 1) {
      this.value = this.max;
    } else {
      const exactValue = this._calculateValue(percent);

      const closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;

      this.value = this._clamp(closestValue, this.min, this.max);
    }
  }

  private _calculatePercentage(value: number | null) {
    return ((value || 0) - this.min) / (this.max - this.min);
  }

  private _calculateValue(percentage: number) {
    return this.min + percentage * (this.max - this.min);
  }

  private _calculateStepmarks() {
    const values: NtSliderStepmark[] = [{ value: this.min, percent: 0 }];
    const range = this.max - this.min;
    let start = this.min;
    while ((start += this.step) < this.max) {
      values.push({
        value: start,
        percent: (start - this.min) / range * 100
      });
    }
    if (!values.find(item => item.value === this.max)) {
      values.push({ value: this.max, percent: 100 });
    }
    return values;
  }

  private _clamp(value: number, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
  }

  private _bindGlobalEvents(triggerEvent: TouchEvent | MouseEvent) {
    if (typeof this._document !== 'undefined' && this._document) {
      const body = this._document.body;
      const isTouch = isTouchEvent(triggerEvent);
      const moveEventName = isTouch ? 'touchmove' : 'mousemove';
      const endEventName = isTouch ? 'touchend' : 'mouseup';
      body.addEventListener(moveEventName, this._pointerMove, activeEventOptions);
      body.addEventListener(endEventName, this._pointerUp, activeEventOptions);

      if (isTouch) {
        body.addEventListener('touchcancel', this._pointerUp, activeEventOptions);
      }
    }
    if (typeof window !== 'undefined' && window) {
      window.addEventListener('blur', this._windowBlur);
    }
  }

  private _removeGlobalEvents() {
    if (typeof this._document !== 'undefined' && this._document) {
      const body = this._document.body;
      body.removeEventListener('mousemove', this._pointerMove, activeEventOptions);
      body.removeEventListener('mouseup', this._pointerUp, activeEventOptions);
      body.removeEventListener('touchmove', this._pointerMove, activeEventOptions);
      body.removeEventListener('touchend', this._pointerUp, activeEventOptions);
      body.removeEventListener('touchcancel', this._pointerUp, activeEventOptions);
    }
    if (typeof window !== 'undefined' && window) {
      window.removeEventListener('blur', this._windowBlur);
    }
  }

  private _windowBlur = () => {
    if (this._lastPointerEvent) {
      this._pointerUp(this._lastPointerEvent);
    }
  }

  private _focusHostElement(options?: FocusOptions) {
    this._elementRef.nativeElement.focus(options);
  }

  private _blurHostElement() {
    this._elementRef.nativeElement.blur();
  }

  private _emitChangeEvent() {
    this._onChange(this.value);
    this.valueChange.emit(this.value);
    this.change.emit(this._createSliderChange());
  }

  private _emitInputEvent() {
    this.input.emit(this._createSliderChange());
    this._changeDetectorRef.markForCheck();
  }

  private _createSliderChange() {
    const change = new NtSliderChange();
    change.source = this;
    change.value = this.value || this.min;
    return change;
  }
}

function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type[0] === 't';
}

function getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
  const point = isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
  return { x: point.clientX, y: point.clientY };
}
