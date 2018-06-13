import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { NtOverlayComponent } from '@ng-tangram/components/core';

@Component({
  selector: '[nt-popover]',
  templateUrl: 'popover.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()'
  }
})
export class NtPopoverComponent {

  private _title = '';

  private _template: TemplateRef<any> | null;

  readonly origin: CdkOverlayOrigin;

  @Input()
  set title(value: string) { this._title = value; }
  get title() { return this._title; }

  @Input()
  set template(value: TemplateRef<any> | null) { this._template = value; }
  get template() { return this._template; }

  @Input('nt-popover')
  set _default(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._template = value;
    } else {
      this._title = value;
      this._template = null;
    }
  }

  @Input() position = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(this._elementRef);
  }
}
