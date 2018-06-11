import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent } from '@ng-tangram/components/core';

@Component({
  selector: '[nt-popconfirm]',
  templateUrl: 'popconfirm.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()'
  }
})
export class NtPopConfirmComponent {

  readonly origin: CdkOverlayOrigin;

  @Input('nt-popconfirm') title = '';
  @Input() position = 'top';

  @Input() confirmText = '确认';
  @Input() cancelText = '取消';

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(this._elementRef);
  }

  _closeOverlay(isConfirm: boolean) {
    (isConfirm ? this.confirm : this.cancel).emit();
    this.overlay.hide();
  }
}
