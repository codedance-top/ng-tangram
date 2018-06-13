import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, TemplateRef
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

  private _title: string = '';

  private _template: TemplateRef<any>;

  @Input()
  set title(value: string) { this._title = value; }
  get title() { return this._title; }

  @Input()
  set template(value: TemplateRef<any>) { this._template = value; }
  get template() { return this._template; }

  @Input('nt-popconfirm')
  set _default(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._template = value;
    } else {
      this._title = value;
      this._template = null;
    }
  }

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
