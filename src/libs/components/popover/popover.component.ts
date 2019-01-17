import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/core';

import { NT_POPOVER_PARENT_COMPONENT, NtPopoverParentComponent } from './popover-pane.component';

@Component({
  selector: '[nt-popover]',
  templateUrl: 'popover.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()'
  },
  providers: [
    { provide: NT_POPOVER_PARENT_COMPONENT, useExisting: NtPopoverComponent }
  ]
})
export class NtPopoverComponent implements NtPopoverParentComponent {

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
  set popover(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._template = value;
    } else {
      this._title = value;
      this._template = null;
    }
  }

  @Input() position: NtOverlayPosition = NtOverlayPosition.Top;

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @Output() afterOpen = new EventEmitter<any>();
  @Output() afterClosed = new EventEmitter<any>();

  @Output() beforeOpen = new EventEmitter<any>();
  @Output() beforeClosed = new EventEmitter<any>();

  @Output() positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(this._elementRef);
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
