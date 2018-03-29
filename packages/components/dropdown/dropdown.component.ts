import { OverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input,
  Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';
import {
  NtOverlayComponent, NtOverlayPosition, NtOverlayTriggerType
} from '@ng-tangram/components/core/overlay';

@Component({
  selector: 'nt-dropdown, [nt-dropdown]',
  templateUrl: 'dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'overlay.click()',
    '(mouseenter)': 'overlay.onMouseEnter()',
    '(mouseleave)': 'overlay.onMouseLeave()'
  }
})
export class NtDropdownComponent {

  readonly origin: OverlayOrigin;

  @Input() position: NtOverlayPosition = 'bottomLeft';

  @Input() trigger: NtOverlayTriggerType = 'hover';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new OverlayOrigin(_elementRef);
  }
}
