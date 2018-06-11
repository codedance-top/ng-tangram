import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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

  readonly origin: CdkOverlayOrigin;

  @Input('nt-popover') title = '';
  @Input() position = 'top';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(this._elementRef);
  }
}
