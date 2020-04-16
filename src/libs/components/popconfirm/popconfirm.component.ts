import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/overlay';

@Component({
  selector: '[nt-popconfirm]',
  templateUrl: 'popconfirm.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.toggle()'
  }
})
export class NtPopConfirmComponent implements OnChanges {

  readonly origin: CdkOverlayOrigin;

  private _title: string = '';

  private _template: TemplateRef<any> | null;

  @Input()
  set title(value: string) { this._title = value; }
  get title() { return this._title; }

  @Input()
  set template(value: TemplateRef<any> | null) { this._template = value; }
  get template() { return this._template; }

  @Input('nt-popconfirm')
  set popconfirm(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._template = value;
    } else {
      this._title = value;
      this._template = null;
    }
  }

  @Input() position: NtOverlayPosition = NtOverlayPosition.Top;

  @Input() confirmText = '确认';
  @Input() cancelText = '取消';

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent, { static: true }) overlay: NtOverlayComponent;

  constructor(
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(this._elementRef);
  }


  ngOnChanges(changes: SimpleChanges) {
    const change = changes.title || changes.template || changes.popover;
    if (change && !change.firstChange) {

      /** 在内容更新之后提示框的位置需要更新，需要延迟执行，因为这时候画面还未渲染 */
      Promise.resolve().then(() => {
        this.overlay.forceUpdatePosition();
      });
    }
  }

  _closeOverlay(event: Event, isConfirm: boolean) {
    (isConfirm ? this.confirm : this.cancel).emit();
    this.overlay.close();
    event.stopPropagation();
  }

  _afterOpen(event: any) {
    this.afterOpen.next(event);
  }

  _afterClosed(event: any) {
    this.afterClosed.next(event);
  }

  _beforeOpen(event: any) {
    this.beforeOpen.next(event);
  }

  _beforeClosed(event: any) {
    this.beforeClosed.next(event);
  }

  _positionChange(change: ConnectedOverlayPositionChange) {
    this.positionChange.next(change);
  }
}
