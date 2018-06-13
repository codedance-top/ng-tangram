import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation, TemplateRef
} from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/core';

@Component({
  selector: 'nt-tooltip, [nt-tooltip]',
  templateUrl: 'tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.tooltip-trigger]': '!_isDirective',
    '(mouseenter)': 'overlay.onMouseEnter()',
    '(mouseleave)': 'overlay.onMouseLeave()'
  }
})
export class NtTooltipComponent {

  private _title = '';

  private _template: TemplateRef<any>;

  readonly origin: CdkOverlayOrigin;

  @Input()
  set title(value: string) { this._title = value; }
  get title() { return this._title; }

  @Input()
  set template(value: TemplateRef<any>) { this._template = value; }
  get template() { return this._template; }

  @Input('nt-tooltip')
  set _default(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._template = value;
    } else {
      this._title = value;
      this._template = null;
    }
  }

  get _isDirective() {
    const attributes = this._elementRef.nativeElement.attributes;
    return attributes && attributes['nt-tooltip'];
  }

  @Input() position: NtOverlayPosition = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(_elementRef);
  }
}
