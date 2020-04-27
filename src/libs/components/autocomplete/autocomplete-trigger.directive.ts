import { defer, merge, Observable, of as observableOf, Subject, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  fromOutsideElementClick,
  NtOptionComponent,
  NtOptionSelectionChange
} from '@ng-tangram/components/core';
import { BOTTOM_LEFT, TOP_LEFT } from '@ng-tangram/components/overlay';

import { NtAutocompleteOriginDirective } from './autocomplete-origin.directive';
import { NtAutocompleteComponent } from './autocomplete.component';

export const NT_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nt-autocomplete-scroll-strategy');

export function NT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const NT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: NT_AUTOCOMPLETE_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: NT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY,
};

export const MAT_AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NtAutocompleteTriggerDirective),
  multi: true
};

export function getMatAutocompleteMissingPanelError(): Error {
  return Error('Attempting to open an undefined instance of `mat-autocomplete`. ' +
    'Make sure that the id passed to the `matAutocomplete` is correct and that ' +
    'you\'re attempting to open it after the ngAfterContentInit hook.');
}


@Directive({
  selector: 'input[ntAutocomplete], textarea[ntAutocomplete]',
  host: {
    'class': 'nt-autocomplete-trigger',
    '(focusin)': '_handleFocus()',
    '(blur)': '_onTouched()',
    '(input)': '_handleInput($event)',
    '(keydown)': '_handleKeydown($event)',
  },
  exportAs: 'ntAutocompleteTrigger',
  providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class NtAutocompleteTriggerDirective implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  private _overlayRef: OverlayRef | null;
  private _portal: TemplatePortal;
  private _componentDestroyed = false;
  private _autocompleteDisabled = false;
  private _scrollStrategy: () => ScrollStrategy;

  private _previousValue: string | number | null;

  private _positionStrategy: FlexibleConnectedPositionStrategy;

  private _manuallyFloatingLabel = false;

  private _closingActionsSubscription: Subscription;

  private _viewportSubscription = Subscription.EMPTY;

  private _canOpenOnNextFocus = true;

  private readonly _closeKeyEventStream = new Subject<void>();

  private _windowBlurHandler = () => {
    this._canOpenOnNextFocus =
      this._document.activeElement !== this._element.nativeElement || this.panelOpen;
  }

  _onChange: (value: any) => void = () => { };

  _onTouched = () => { };

  @Input('ntAutocomplete') autocomplete: NtAutocompleteComponent;

  @Input('ntAutocompleteConnectedTo') connectedTo: NtAutocompleteOriginDirective;

  @Input('ntAutocompletePosition') position: 'auto' | 'above' | 'below' = 'auto';

  @Input('autocomplete') autocompleteAttribute = 'off';

  @Input('ntAutocompleteDisabled')
  get autocompleteDisabled(): boolean { return this._autocompleteDisabled; }
  set autocompleteDisabled(value: boolean) {
    this._autocompleteDisabled = coerceBooleanProperty(value);
  }

  constructor(
    private _element: ElementRef<HTMLInputElement>,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _zone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(NT_AUTOCOMPLETE_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() private _dir: Directionality,
    @Optional() @Inject(DOCUMENT) private _document: any,
    // @breaking-change 8.0.0 Make `_viewportRuler` required.
    private _viewportRuler?: ViewportRuler) {
    this._scrollStrategy = scrollStrategy;
  }

  ngAfterViewInit() {
    const window = this._getWindow();

    if (typeof window !== 'undefined') {
      this._zone.runOutsideAngular(() => {
        window.addEventListener('blur', this._windowBlurHandler);
      });

      // this._isInsideShadowRoot = !!_getShadowRoot(this._element.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['position'] && this._positionStrategy) {
      this._setStrategyPositions(this._positionStrategy);

      if (this.panelOpen) {
        this._overlayRef!.updatePosition();
      }
    }
  }

  ngOnDestroy() {
    const window = this._getWindow();

    if (typeof window !== 'undefined') {
      window.removeEventListener('blur', this._windowBlurHandler);
    }

    this._viewportSubscription.unsubscribe();
    this._componentDestroyed = true;
    this._destroyPanel();
    this._closeKeyEventStream.complete();
  }

  get panelOpen(): boolean {
    return this._overlayAttached && this.autocomplete.showPanel;
  }

  private _overlayAttached = false;

  openPanel(): void {
    this._attachOverlay();
  }

  closePanel(): void {
    this._resetLabel();

    if (!this._overlayAttached) {
      return;
    }

    if (this.panelOpen) {
      this.autocomplete.closed.emit();
    }

    this.autocomplete._isOpen = this._overlayAttached = false;

    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
      this._closingActionsSubscription.unsubscribe();
    }

    if (!this._componentDestroyed) {
      this._changeDetectorRef.detectChanges();
    }
  }

  updatePosition(): void {
    if (this._overlayAttached) {
      this._overlayRef!.updatePosition();
    }
  }

  get panelClosingActions(): Observable<NtOptionSelectionChange | null> {
    return merge(
      this.optionSelections,
      this.autocomplete._keyManager.tabOut.pipe(filter(() => this._overlayAttached)),
      this._closeKeyEventStream,
      this._getOutsideClickStream(),
      this._overlayRef ?
        this._overlayRef.detachments().pipe(filter(() => this._overlayAttached)) :
        observableOf()
    ).pipe(
      map(event => event instanceof NtOptionSelectionChange ? event : null)
    );
  }

  readonly optionSelections: Observable<NtOptionSelectionChange> = defer(() => {
    if (this.autocomplete && this.autocomplete.options) {
      return merge(...this.autocomplete.options.map(option => option.selectionChange));
    }

    return this._zone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelections));
  }) as Observable<NtOptionSelectionChange>;

  get activeOption(): NtOptionComponent | null {
    if (this.autocomplete && this.autocomplete._keyManager) {
      return this.autocomplete._keyManager.activeItem;
    }

    return null;
  }

  writeValue(value: any): void {
    Promise.resolve(null).then(() => this._setTriggerValue(value));
  }

  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._element.nativeElement.disabled = isDisabled;
  }

  _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    if (keyCode === ESCAPE) {
      event.preventDefault();
    }

    if (this.activeOption && keyCode === ENTER && this.panelOpen) {
      this.activeOption.selectViaInteraction();
      this._resetActiveItem();
      event.preventDefault();
    } else if (this.autocomplete) {
      const prevActiveItem = this.autocomplete._keyManager.activeItem;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

      if (this.panelOpen || keyCode === TAB) {
        this.autocomplete._keyManager.onKeydown(event);
      } else if (isArrowKey && this._canOpen()) {
        this.openPanel();
      }

      if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
        this._scrollToOption();
      }
    }
  }

  _handleInput(event: KeyboardEvent): void {
    let target = event.target as HTMLInputElement;
    let value: number | string | null = target.value;

    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }

    if (this._previousValue !== value) {
      this._previousValue = value;
      this._onChange(value);

      if (this._canOpen() && this._document.activeElement === event.target) {
        this.openPanel();
      }
    }
  }

  _handleFocus(): void {
    if (!this._canOpenOnNextFocus) {
      this._canOpenOnNextFocus = true;
    } else if (this._canOpen()) {
      this._previousValue = this._element.nativeElement.value;
      this._attachOverlay();
    }
  }

  private _getOutsideClickStream(): Observable<any> {
    return fromOutsideElementClick([
      this._element.nativeElement,
      this.autocomplete.panel.nativeElement
    ], this._document);
  }

  private _resetLabel(): void {
    if (this._manuallyFloatingLabel) {
      this._manuallyFloatingLabel = false;
    }
  }

  private _scrollToOption(): void {

    const activeOption = this.autocomplete._keyManager.activeItem || this.autocomplete.options.first;

    if (!activeOption) {
      return;
    }
    const panelElement = this.autocomplete.panel.nativeElement;
    const panelScrollTop = panelElement.scrollTop;
    const panelScrollBottom = panelScrollTop + panelElement.offsetHeight;

    if (panelScrollBottom === 0) {
      panelElement.scrollTop = activeOption.getOffsetTop();
    } else if (activeOption.getOffsetTop() < panelScrollTop) {

      // 当活动选项超出 panel 的顶部范围时，重新设置 panel 可视区域。
      panelElement.scrollTop = activeOption.getOffsetTop();
    } else if (activeOption.getOffsetTop() + activeOption.getOffsetHeight() >= panelScrollBottom) {

      // 当活动选项超出 panel 的底部范围时，重新设置 panel 可视区域。
      const scrollOffset = panelElement.offsetHeight - activeOption.getOffsetHeight();
      panelElement.scrollTop = activeOption.getOffsetTop() - scrollOffset;
    }
  }

  private _subscribeToClosingActions(): Subscription {
    const firstStable = this._zone.onStable.asObservable().pipe(take(1));
    const optionChanges = this.autocomplete.options.changes.pipe(
      tap(() => this._positionStrategy.reapplyLastPosition()),
      delay(0)
    );

    return merge(firstStable, optionChanges)
      .pipe(
        switchMap(() => {
          const wasOpen = this.panelOpen;
          this._resetActiveItem();
          this.autocomplete._setVisibility();

          if (this.panelOpen) {
            this._overlayRef!.updatePosition();

            if (wasOpen !== this.panelOpen) {
              this.autocomplete.opened.emit();
            }
          }

          return this.panelClosingActions;
        }),
        take(1))
      .subscribe(event => this._setValueAndClose(event));
  }

  private _destroyPanel(): void {
    if (this._overlayRef) {
      this.closePanel();
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }

  private _setTriggerValue(value: any): void {
    const toDisplay = this.autocomplete && this.autocomplete.displayWith ?
      this.autocomplete.displayWith(value) :
      value;

    const inputValue = toDisplay != null ? toDisplay : '';

    // If it's used within a `MatFormField`, we should set it through the property so it can go
    // through change detection.
    // if (this._formField) {
    //   this._formField._control.value = inputValue;
    // } else {
    this._element.nativeElement.value = inputValue;
    // }

    this._previousValue = inputValue;
  }

  private _setValueAndClose(event: NtOptionSelectionChange | null): void {
    if (event && event.source) {
      this._clearPreviousSelectedOption();
      this._setTriggerValue(event.source.value);
      this._onChange(event.source.value);
      this._element.nativeElement.focus();
      this.autocomplete._emitSelectEvent(event.source);
    }

    this.closePanel();
  }

  private _clearPreviousSelectedOption() {
    this.autocomplete.options.forEach(option => {
      if (option.selected) {
        option.deselect();
      }
    });
  }

  private _attachOverlay(): void {
    if (!this.autocomplete) {
      throw getMatAutocompleteMissingPanelError();
    }

    let overlayRef = this._overlayRef;

    if (!overlayRef) {
      this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef);
      overlayRef = this._overlay.create(this._getOverlayConfig());
      this._overlayRef = overlayRef;

      overlayRef.keydownEvents().subscribe(event => {
        if (event.keyCode === ESCAPE || (event.keyCode === UP_ARROW && event.altKey)) {
          this._resetActiveItem();
          this._closeKeyEventStream.next();

          event.stopPropagation();
          event.preventDefault();
        }
      });

      if (this._viewportRuler) {
        this._viewportSubscription = this._viewportRuler.change().subscribe(() => {
          if (this.panelOpen && overlayRef) {
            overlayRef.updateSize({ width: this._getPanelWidth() });
          }
        });
      }
    } else {
      this._positionStrategy.setOrigin(this._getConnectedElement());
      overlayRef.updateSize({ width: this._getPanelWidth() });
    }

    if (overlayRef && !overlayRef.hasAttached()) {
      overlayRef.attach(this._portal);
      this._closingActionsSubscription = this._subscribeToClosingActions();
    }

    const wasOpen = this.panelOpen;

    this.autocomplete._setVisibility();
    this.autocomplete._isOpen = this._overlayAttached = true;

    if (this.panelOpen && wasOpen !== this.panelOpen) {
      this.autocomplete.opened.emit();
    }
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPosition(),
      scrollStrategy: this._scrollStrategy(),
      width: this._getPanelWidth(),
      direction: this._dir
    });
  }

  private _getOverlayPosition(): PositionStrategy {
    const strategy = this._overlay.position()
      .flexibleConnectedTo(this._getConnectedElement())
      .withFlexibleDimensions(false)
      .withPush(false);

    this._setStrategyPositions(strategy);
    this._positionStrategy = strategy;
    return strategy;
  }

  private _setStrategyPositions(positionStrategy: FlexibleConnectedPositionStrategy) {

    const belowPositions: ConnectedPosition[] = [BOTTOM_LEFT, TOP_LEFT];
    const abovePositions: ConnectedPosition[] = [TOP_LEFT, BOTTOM_LEFT];

    let positions: ConnectedPosition[];

    if (this.position === 'above') {
      positions = abovePositions;
    } else if (this.position === 'below') {
      positions = belowPositions;
    } else {
      positions = [...belowPositions, ...abovePositions];
    }

    positionStrategy.withPositions(positions);
  }

  private _getConnectedElement(): ElementRef {
    if (this.connectedTo) {
      return this.connectedTo.elementRef;
    }

    return this._element;
  }

  private _getPanelWidth(): number | string {
    return this.autocomplete.panelWidth || this._getHostWidth();
  }

  private _getHostWidth(): number {
    return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
  }

  private _resetActiveItem(): void {
    this.autocomplete._keyManager.setActiveItem(this.autocomplete.autoActiveFirstOption ? 0 : -1);
  }

  private _canOpen(): boolean {
    const element = this._element.nativeElement;
    return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
  }

  private _getWindow(): Window {
    return this._document?.defaultView || window;
  }

  static ngAcceptInputType_autocompleteDisabled: BooleanInput;
}
