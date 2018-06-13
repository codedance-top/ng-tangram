import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterContentInit, Component, ContentChild, ElementRef, Input,
  Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';
import {
  NtOverlayComponent, NtOverlayPosition, NtOverlayTriggerType
} from '@ng-tangram/components/core';
import { NtDropdownPaneComponent } from './dropdown-pane.component';

@Component({
  selector: 'nt-dropdown, [nt-dropdown]',
  templateUrl: 'dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'nt-dropdown-toggle',
    '(click)': 'overlay.click()',
    '(mouseenter)': 'overlay.onMouseEnter()',
    '(mouseleave)': 'overlay.onMouseLeave()'
  }
})
export class NtDropdownComponent {

  readonly origin: CdkOverlayOrigin;

  @Input() position: NtOverlayPosition = 'bottomLeft';

  @Input() trigger: NtOverlayTriggerType = 'hover';

  @ViewChild(NtOverlayComponent) overlay: NtOverlayComponent;

  @ContentChild(NtDropdownPaneComponent) pane: NtDropdownPaneComponent;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(_elementRef);
  }
}
