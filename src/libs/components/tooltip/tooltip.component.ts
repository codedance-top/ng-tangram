import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewEncapsulation
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
export class NtTooltipComponent implements OnChanges {

  private _title = '';

  private _template: TemplateRef<any> | null;

  readonly origin: CdkOverlayOrigin;

  @Input()
  set title(value: string) { this._title = value; }
  get title() { return this._title; }

  @Input()
  set template(value: TemplateRef<any> | null) { this._template = value; }
  get template() { return this._template; }

  @Input('nt-tooltip')
  set tooltip(value: string | TemplateRef<any>) {
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

  @Input() position: NtOverlayPosition = NtOverlayPosition.Top;

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(_elementRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.title || changes.template || changes.tooltip;
    if (change && !change.firstChange) {

      /** 在内容更新之后提示框的位置需要更新，需要延迟执行，因为这时候画面还未渲染 */
      Promise.resolve().then(() => {
        this.overlay.cdkConnectedOverlay.overlayRef.updatePosition();
      });
    }
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
