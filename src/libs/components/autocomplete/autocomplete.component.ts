import { Subscription } from 'rxjs';

import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NT_OPTION_PARENT_COMPONENT, NtOptionComponent } from '@ng-tangram/components/core';

let _uniqueIdCounter = 0;

export class NtAutocompleteSelectedEvent {
  constructor(
    public source: NtAutocompleteComponent,
    public option: NtOptionComponent) { }
}

export interface NtAutocompleteActivatedEvent {
  source: NtAutocompleteComponent;

  option: NtOptionComponent|null;
}

export interface NtAutocompleteDefaultOptions {
  autoActiveFirstOption?: boolean;
}

export const NT_AUTOCOMPLETE_DEFAULT_OPTIONS =
  new InjectionToken<NtAutocompleteDefaultOptions>('nt-autocomplete-default-options', {
    providedIn: 'root',
    factory: NT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY,
  });

export function NT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY(): NtAutocompleteDefaultOptions {
  return { autoActiveFirstOption: false };
}

@Component({
  selector: 'nt-autocomplete',
  templateUrl: 'autocomplete.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ntAutocomplete',
  host: {
    'class': 'nt-autocomplete'
  },
  providers: [
    { provide: NT_OPTION_PARENT_COMPONENT, useExisting: NtAutocompleteComponent }
  ]
})
export class NtAutocompleteComponent implements AfterContentInit, OnDestroy {

  private _activeOptionChanges = Subscription.EMPTY;

  _keyManager: ActiveDescendantKeyManager<NtOptionComponent>;

  showPanel: boolean = false;

  _isOpen: boolean = false;

  get isOpen(): boolean { return this._isOpen && this.showPanel; }
  
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;

  @ViewChild('panel') panel: ElementRef;

  @ContentChildren(NtOptionComponent, { descendants: true }) options: QueryList<NtOptionComponent>;

  @Input() displayWith: ((value: any) => string) | null = null;

  private _autoActiveFirstOption: boolean;

  @Input()
  get autoActiveFirstOption(): boolean { return this._autoActiveFirstOption; }
  set autoActiveFirstOption(value: boolean) {
    this._autoActiveFirstOption = coerceBooleanProperty(value);
  }

  @Input() panelWidth: string | number;

  @Output() readonly optionSelected = new EventEmitter<NtAutocompleteSelectedEvent>();

  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  @Output() readonly optionActivated = new EventEmitter<NtAutocompleteActivatedEvent>();

  @Input('class')
  set classList(value: string) {
    if (value && value.length) {
      this._classList = value.split(' ').reduce((classList, className) => {
        classList[className.trim()] = true;
        return classList;
      }, {} as { [key: string]: boolean });
    } else {
      this._classList = {};
    }

    this._setVisibilityClasses(this._classList);
    this._elementRef.nativeElement.className = '';
  }
  _classList: { [key: string]: boolean } = {};

  id: string = `nt-autocomplete-${_uniqueIdCounter++}`;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(NT_AUTOCOMPLETE_DEFAULT_OPTIONS) defaults: NtAutocompleteDefaultOptions) {

    this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<NtOptionComponent>(this.options).withWrap();
    this._activeOptionChanges = this._keyManager.change.subscribe(index => {
      this.optionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
    });

    this._setVisibility();
  }

  ngOnDestroy() {
    this._activeOptionChanges.unsubscribe();
  }

  _setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  _getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

  _setVisibility() {
    this.showPanel = !!this.options.length;
    this._setVisibilityClasses(this._classList);
    this._changeDetectorRef.markForCheck();
  }

  _emitSelectEvent(option: NtOptionComponent): void {
    const event = new NtAutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }

  private _setVisibilityClasses(classList: { [key: string]: boolean }) {
    classList['mat-autocomplete-visible'] = this.showPanel;
    classList['mat-autocomplete-hidden'] = !this.showPanel;
  }

  static ngAcceptInputType_autoActiveFirstOption: BooleanInput;
  static ngAcceptInputType_disableRipple: BooleanInput;
}
