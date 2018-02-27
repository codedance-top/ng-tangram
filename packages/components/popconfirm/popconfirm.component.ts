
import { Component, Input, Output, ElementRef, EventEmitter, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayPosition, NtOverlayComponent } from '@ng-tangram/components/_core/overlay';

import { AnimationEvent, trigger, transition } from '@angular/animations';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';

@Component({
  selector: '[nt-popconfirm]',
  templateUrl: 'popconfirm.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()'
  }
})
export class NtPopConfirmComponent {

  readonly origin: OverlayOrigin;

  @Input('ntTitle') title = '';
  @Input('ntPosition') position = 'top';

  @Output('ntOnConfirm') onConfirm = new EventEmitter<any>();
  @Output('ntOnCancel') onCancel = new EventEmitter<any>();

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }

  confirm() {
    this.onConfirm.emit();
    this.overlay.hide();
  }

  cancel() {
    this.onCancel.emit();
    this.overlay.hide();
  }
}
