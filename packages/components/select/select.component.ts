
import { Component, ElementRef, EventEmitter, forwardRef, Input, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '../overlay';

// import { NtOptionComponent } from './option.component';

@Component({
  selector: 'nt-select',
  template: `
    <input #input type="text" (focus)="onFocus()" (blur)="onBlur()" readonly [placeholder]="_placeholder" [disabled]="_disabled">
    <span class="nt-select-caret"></span>
    <nt-overlay
      [ntOrigin]="_origin"
      ntPosition="bottomLeft">
      <div class="nt-select-pane">

      </div>
    </nt-overlay>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NtSelectComponent),
      multi: true
    }
  ],
  styleUrls: ['select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-select',
    '(click)': 'onClick()'
  }
})
export class NtSelectComponent implements ControlValueAccessor {

  _origin: OverlayOrigin;
  _disabled = false;

  private _focused = false;

  onChange: (value: any) => void;
  onTouched: (value: any) => void;

  @Input('placeholder') _placeholder = '';

  @ViewChild('input') _input: ElementRef;
  @ViewChild(NtOverlayComponent) _overlay: NtOverlayComponent;
  // @ViewChildren(NtOptionComponent) _options: NtOptionComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this._origin = new OverlayOrigin(_elementRef);
  }

  @Input('disabled')
  set disabled(value: boolean) {
    this._disabled = value === false ? false : true;
  }

  onFocus() {
    if (!this._overlay._isOpen) {
      this._overlay.show();
      setTimeout(() => this._focused = true, 200);
    }
  }

  onBlur() {
    if (this._overlay._isOpen) {
      this._overlay.hide();
      this._focused = false;
    }
  }

  onClick() {
    if (this._focused && document.activeElement === this._input.nativeElement) {
      this._input.nativeElement.blur();
    }
  }

  writeValue(value: any) {
    const input = this._input.nativeElement;
    // if (value !== undefined) {
    this._renderer.setProperty(input, 'value', value);
    // }
    // this._value = value;
    // this.onChange(this._value);
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }
}
