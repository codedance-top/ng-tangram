
import {
  AfterViewChecked, Component, ChangeDetectorRef, ElementRef, EventEmitter, Input,
  Inject, InjectionToken, Output, Optional, ViewChild, ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Highlightable } from '@angular/cdk/a11y';
import { Subject } from 'rxjs/Subject';

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
    '[class.selected]': 'selected',
    '[class.disabled]': 'disabled',
    '[class.hidden]': '_hidden',
    '[class.active]': '_isActive',
    '(click)': 'selectViaInteraction()'
  }
})
export class NtOptionComponent implements AfterViewChecked, Highlightable {

  private _value: any;
  private _selected = false;
  private _disabled = false;

  private _mostRecentViewValue = '';

  _isActive = false;
  _hidden = false;

  get label() { return (this._element.nativeElement.textContent || '').trim(); }

  get multiple() { return this._parent && this._parent.multiple; }

  @Input()
  set value(value: any) { this._value = value; }
  get value() { return this._value; }

  @Input()
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
  get disabled() { return this._disabled; }

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

  getOffsetY() {
    return this._element.nativeElement.offsetTop;
  }

  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new NtOptionSelectionChange(this, isUserInput));
  }
}
