import { defer, merge, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { transition, trigger } from '@angular/animations';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW
} from '@angular/cdk/keycodes';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input,
  isDevMode, NgZone, OnDestroy, Optional, Output, QueryList, Renderer2, Self, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import {
  BOTTOM_LEFT, NT_OPTION_PARENT_COMPONENT, NtOptionComponent, NtOptionParentComponent,
  NtOptionSelectionChange, NtOverlayComponent, TOP_LEFT
} from '@ng-tangram/components/core';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

export function getNtSelectDynamicMultipleError() {
  return Error('Cannot change `multiple` mode of select after initialization.');
}

export function getNtSelectNonArrayValueError() {
  return Error('Value must be an array in multiple-selection mode.');
}

export function getNtSelectNonFunctionValueError() {
  return Error('`compareWith` must be a function.');
}

export class NtSelectChange {
  constructor(public source: NtSelectComponent, public value: any) { }
}

@Component({
  selector: 'nt-select',
  templateUrl: 'select.component.html',
  providers: [
    { provide: NT_OPTION_PARENT_COMPONENT, useExisting: NtSelectComponent },
    { provide: NtFormFieldControl, useExisting: NtSelectComponent }
  ],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition('* => void', fadeOut(.15)),
      transition('void => *', fadeIn(.15))
    ])
  ],
  host: {
    'class': 'nt-select nt-form-control nt-has-symbol',
    '(resize)': 'onResize()',
    '[class.focus]': 'overlay.isOpen'
  }
})
export class NtSelectComponent extends NtFormFieldControl<any>
  implements AfterContentInit, ControlValueAccessor, NtOptionParentComponent, OnDestroy {

  private readonly _destroy = new Subject<void>();

  readonly origin: CdkOverlayOrigin;

  private _disabled = false;
  private _focused = false;
  private _selectionModel: SelectionModel<NtOptionComponent>;
  private _state = '';
  private _placeholder = '';
  private _width: number;
  private _multiple = false;
  private _value: any;
  private _required = false;

  _positionPairs = [BOTTOM_LEFT, TOP_LEFT];

  private _compareWith = (o1: any, o2: any) => o1 === o2;
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };
  private _filter: (keyword: string, option: NtOptionComponent) => boolean;

  get value() { return this._value; }
  get triggerValue(): string {
    if (this.empty) {
      return '';
    }

    if (this._multiple) {
      const selectedOptions = this._selectionModel.selected.map(option => option.label);
      return selectedOptions.join(', ');
    }

    return this._selectionModel.selected[0].label;
  }

  get empty(): boolean { return !this._selectionModel || this._selectionModel.isEmpty(); }

  get optionEmpty(): boolean {
    return this.options ? this.options.filter(option => !option.hidden).length === 0 : false;
  }

  get focused(): boolean { return this._focused; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  get state() { return this._state; }

  get width() { return this._width; }

  @Input()
  set multiple(value: boolean) { this._multiple = coerceBooleanProperty(value); }
  get multiple() { return this._multiple; }

  @Input()
  set filter(value: (input: string, option: NtOptionComponent) => boolean) {
    if (typeof value === 'function') {
      this._filter = value;
    } else if (coerceBooleanProperty(value)) {
      this._filter = (keyword: string, option: NtOptionComponent) => {
        const regex = new RegExp(keyword.toLowerCase(), 'g');
        return regex.test(option.label.toLowerCase());
      };
    }
  }
  get filter() { return this._filter; }

  @Input() filterNotFound = 'Not Found';

  get selected(): NtOptionComponent | NtOptionComponent[] {
    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  @Input()
  set placeholder(value: string) { this._placeholder = value; }
  get placeholder() {
    if (this.empty) {
      return this._placeholder;
    }

    return this.filter ? this.triggerValue : this._placeholder;
  }

  _keyManager: ActiveDescendantKeyManager<NtOptionComponent>;

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('paneElement') paneElement: ElementRef;

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;
  @ContentChildren(NtOptionComponent) options: QueryList<NtOptionComponent>;

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @Output() readonly selectionChange: EventEmitter<NtSelectChange> = new EventEmitter<NtSelectChange>();

  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw getNtSelectNonFunctionValueError();
    } else {
      this._compareWith = fn;
      if (this._selectionModel) {
        this._initializeSelection();
      }
    }
  }

  readonly optionSelectionChanges: Observable<NtOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  constructor(
    private _ngZone: NgZone,
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public ngControl: NgControl) {
    super();

    this.origin = new CdkOverlayOrigin(this._elementRef);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple, undefined, false);
  }

  ngAfterContentInit() {
    this._initKeyManager();
    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  onResize() {
    this._width = this.inputElement.nativeElement.clientWidth;
  }

  onSearch(event: KeyboardEvent) {
    if (this.focused && this.filter && !this.disabled) {
      const target: any = event.target;
      this.options.forEach(option => option.hidden = !this.filter(target.value, option));
    }
  }

  _beforeOpen(event: any) {
    this._state = 'folded';
    this.onResize();
    this._scrollActiveOptionIntoView();
    this._highlightCorrectOption();
    this.beforeOpen.next(event);
  }

  _beforeClosed(event: any) {
    this._state = 'closed';
    this._onTouched();
    this.beforeClosed.next(event);
  }

  _afterOpen(event: any) {
    this.afterOpen.next(event);
  }

  _afterClosed(event: any) {
    this._resetFilterResult();
    this.inputElement.nativeElement.blur();
    this.afterClosed.next(event);
  }

  _positionChange(change: ConnectedOverlayPositionChange) {
    this.positionChange.next(change);
  }

  onFocus() {
    if (!this.overlay.isOpen && !this._disabled) {
      this.overlay.show();
      this._focused = true;
    }
  }

  onBlur() {
    this._focused = false;
  }

  focus() {
    this.inputElement.nativeElement.focus();
  }

  writeValue(value: any) {
    if (this.options) {
      this._setSelectionByValue(value);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  clear() {
    if (!this.disabled) {
      this._clearSelection();
      this._value = null;
      this._onChange(this.value);
      this.valueChange.next(this.value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  /** Handles all keydown events on the select. */
  _handleKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      this.overlay.isOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const manager = this._keyManager;
    if (keyCode === HOME || keyCode === END) {
      event.preventDefault();
      keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();

    } else if (isArrowKey && event.altKey) {
      event.preventDefault();
      this.overlay.hide();
    } else if ((keyCode === ENTER || keyCode === SPACE) && manager.activeItem) {
      event.preventDefault();
      manager.activeItem.selectViaInteraction();
      if (keyCode === ENTER && this.multiple) {
        this.overlay.hide();
      }
    } else {

      const previouslyFocusedIndex = manager.activeItemIndex;
      manager.onKeydown(event);

      if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
        manager.activeItemIndex !== previouslyFocusedIndex) {
        manager.activeItem.selectViaInteraction();
      }
    }
  }

  private _handleClosedKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
      keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    // Open the select on ALT + arrow key to match the native <select>
    if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
      event.preventDefault(); // prevents the page from scrolling down when pressing space
      this.overlay.show();
    } else if (!this.multiple) {
      this._keyManager.onKeydown(event);
    }
  }

  private _resetOptions() {

    const changedOrDestroyed = merge(this.options.changes, this._destroy);

    this.optionSelectionChanges
      .pipe(takeUntil(changedOrDestroyed), filter(event => event.isUserInput))
      .subscribe(event => {
        this._onSelect(event.source);
        if (!this.multiple && this.overlay.isOpen) {
          this.overlay.hide();
        }
      });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map(option => option.stateChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });

    this._resetFilterResult();
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {

    this._keyManager = new ActiveDescendantKeyManager<NtOptionComponent>(this.options)
      .withTypeAhead()
      .withVerticalOrientation();

    this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
      // Restore focus to the trigger before closing. Ensures that the focus
      // position won't be lost if the user got focus into the overlay.
      this.focus();
      this.overlay.hide();
      // this.inputElement.nativeElement.blur();
    });

    this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this.overlay.isOpen && this.paneElement) {
        this._scrollActiveOptionIntoView();
      } else if (!this.overlay.isOpen && !this.multiple && this._keyManager.activeItem) {
        this._keyManager.activeItem.selectViaInteraction();
      }
    });
  }

  private _resetFilterResult() {
    this.options.forEach(option => option.hidden = false);
  }

  private _initializeSelection(): void {
    Promise.resolve().then(() => {
      this._setSelectionByValue(this.ngControl ? this.ngControl.value : this.value);
    });
  }

  private _setSelectionByValue(value: any | any[], isUserInput = false): void {
    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw getNtSelectNonArrayValueError();
      }

      this._clearSelection();
      value.forEach((currentValue: any) => this._selectValue(currentValue, isUserInput));
      this._sortValues();
    } else {
      this._clearSelection();

      const correspondingOption = this._selectValue(value, isUserInput);
      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what option the user interacted with last.
      if (correspondingOption) {
        this._keyManager.setActiveItem(this.options.toArray().indexOf(correspondingOption));
      }
    }

    this._changeDetectorRef.markForCheck();
  }

  private _selectValue(value: any, isUserInput = false): NtOptionComponent | undefined {
    const correspondingOption = this.options.find((option: NtOptionComponent) => {
      try {
        return option.value != null && this._compareWith(option.value, value);
      } catch (error) {
        if (isDevMode()) {
          console.warn(error);
        }
        return false;
      }
    });

    if (correspondingOption) {
      isUserInput ? correspondingOption.selectViaInteraction() : correspondingOption.select();
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.multiple) {
      valueToEmit = (this.selected as NtOptionComponent[]).map(option => option.value);
    } else {
      valueToEmit = this.selected ? (this.selected as NtOptionComponent).value : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new NtSelectChange(this, valueToEmit));
    this._changeDetectorRef.markForCheck();
  }

  private _clearSelection(skip?: NtOptionComponent) {
    this._selectionModel.clear();
    this.options.forEach(option => {
      if (option !== skip) {
        option.deselect();
      }
    });
  }

  private _sortValues(): void {
    if (this.multiple) {
      this._selectionModel.clear();

      this.options.forEach(option => {
        if (option.selected) {
          this._selectionModel.select(option);
        }
      });
    }
  }

  private _onSelect(option: NtOptionComponent) {
    const wasSelected = this._selectionModel.isSelected(option);

    if (this.multiple) {
      this._selectionModel.toggle(option);
      wasSelected ? option.deselect() : option.select();
      this._keyManager.setActiveItem(this.options.toArray().indexOf(option));
      this._sortValues();
    } else {
      this._clearSelection(option.value == null ? undefined : option);

      if (option.value == null) {
        this._propagateChanges(option.value);
      } else {
        this._selectionModel.select(option);
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
  }


  /**
   * Highlights the selected item. If no option is selected, it will highlight
   * the first item instead.
   */
  private _highlightCorrectOption(): void {
    if (this._keyManager) {
      if (this.empty) {
        this._keyManager.setFirstItemActive();
      } else {
        const selectIndex = this.options.toArray().indexOf(this._selectionModel.selected[0]);
        this._keyManager.setActiveItem(selectIndex);
      }
    }
  }

  private _scrollActiveOptionIntoView() {
    const activeOption = this._keyManager.activeItem || this.options.first;

    if (!activeOption) {
      return;
    }

    const panelScrollTop = this.paneElement.nativeElement.scrollTop;
    const panelScrollBottom = panelScrollTop + this.paneElement.nativeElement.offsetHeight;

    if (panelScrollBottom === 0) {
      this.paneElement.nativeElement.scrollTop = activeOption.getOffsetTop();
    } else if (activeOption.getOffsetTop() < panelScrollTop) {

      // 当活动选项超出 panel 的顶部范围时，重新设置 panel 可视区域。
      this.paneElement.nativeElement.scrollTop = activeOption.getOffsetTop();
    } else if (activeOption.getOffsetTop() + activeOption.getOffsetHeight() >= panelScrollBottom) {

      // 当活动选项超出 panel 的底部范围时，重新设置 panel 可视区域。
      const scrollOffset = this.paneElement.nativeElement.offsetHeight - activeOption.getOffsetHeight();
      this.paneElement.nativeElement.scrollTop = activeOption.getOffsetTop() - scrollOffset;
    }
  }
}
