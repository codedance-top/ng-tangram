
import {
  AfterViewChecked, Component, ChangeDetectorRef, ElementRef, EventEmitter, Input,
  Inject, InjectionToken, Output, Optional, ViewChild, ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Highlightable, ListKeyManagerOption } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

export interface NtOptionParentComponent {
  disabled?: boolean;
  multiple?: boolean;
}

export class NtOptionSelectionChange {
  constructor(
    public source: NtOptionComponent,
    public isUserInput = false) { }
}

export const NT_OPTION_PARENT_COMPONENT = new InjectionToken<NtOptionParentComponent>('nt-option-parent-component');

@Component({
  selector: 'nt-option',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-option',
    '[class.nt-option-selected]': 'selected',
    '[class.nt-option-disabled]': 'disabled',
    '[class.nt-option-active]': '_isActive',
    '[class.nt-option-hidden]': 'hidden',
    '(click)': 'selectViaInteraction()'
  }
})
export class NtOptionComponent implements AfterViewChecked, Highlightable, ListKeyManagerOption {

  private _value: any;
  private _selected = false;
  private _disabled = false;
  private _label = '';
  private _hidden = false;

  private _mostRecentViewValue = '';

  _isActive = false;

  @Input()
  set label(value: string) { this._label = value; }
  get label() {
    if (!this._label.trim()) {
      return (this._element.nativeElement.textContent || '').trim();
    }
    return this._label.trim();
  }

  get multiple() { return this._parent && this._parent.multiple; }

  @Input()
  set value(value: any) { this._value = value; }
  get value() { return this._value; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

  set hidden(value: boolean) {
    this._hidden = coerceBooleanProperty(value);
    this._disabled = this._hidden;
  }
  get hidden() { return this._hidden; }

  get selected() { return this._selected; }

  readonly stateChanges = new Subject<void>();

  @Output() readonly selectionChange = new EventEmitter<NtOptionSelectionChange>();

  constructor(
    private _element: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(NT_OPTION_PARENT_COMPONENT) private _parent: NtOptionParentComponent) { }

  ngAfterViewChecked() {
    if (this._selected) {
      const viewValue = this.label;
      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this.stateChanges.next();
      }
    }
  }

  focus() {
    const element = this._element.nativeElement;
    if (typeof element.focus === 'function') {
      element.focus();
    }
  }

  select() {
    this._selected = true;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  deselect() {
    this._selected = false;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  selectViaInteraction() {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._emitSelectionChangeEvent(true);
    }
  }

  setActiveStyles() {
    this._isActive = true;
  }

  setInactiveStyles() {
    this._isActive = false;
  }

  getLabel() {
    return this.label;
  }

  getOffsetTop() {
    return this._element.nativeElement.offsetTop;
  }

  getOffsetHeight() {
    return this._element.nativeElement.offsetHeight;
  }

  protected _emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new NtOptionSelectionChange(this, isUserInput));
  }
}
