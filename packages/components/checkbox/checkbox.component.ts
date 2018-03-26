import {
  Component, ElementRef, forwardRef, Input, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export declare type NtCheckboxColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';

let uniqueId = 0;

@Component({
  selector: 'nt-checkbox',
  template: `
    <input id="{{id}}" type="checkbox">
    <label for="{{id}}"><ng-content></ng-content></label>
  `,
  styleUrls: ['checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '["checkbox", color]',
    '(click)': 'onClick()'
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NtCheckboxComponent), multi: true }
  ]
})
export class NtCheckboxComponent implements ControlValueAccessor {

  @Input('ntColor') color: NtCheckboxColor = '';

  _checked: boolean = false;

  onChange: (value: any) => void;
  onTouched: (value: any) => void;

  @ViewChild('input') inputRef: ElementRef;

  @Input('ntValue') _value: any ;

  readonly id: string = `nt-checkbox-${uniqueId++}`;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
  }

  writeValue(value: any) {
    this._checked = !!value;
    this.onChange(this._checked);
  }

  onClick() {
    // this.onTouched();
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._renderer.setProperty(this.inputRef.nativeElement, 'disabled', isDisabled);
  }
}
