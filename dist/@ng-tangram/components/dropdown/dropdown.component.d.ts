import { OverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef, Renderer2 } from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition, NtOverlayTriggerType } from '@ng-tangram/components/core';
export declare class NtDropdownComponent {
    private _renderer;
    private _elementRef;
    readonly origin: OverlayOrigin;
    position: NtOverlayPosition;
    trigger: NtOverlayTriggerType;
    overlay: NtOverlayComponent;
    constructor(_renderer: Renderer2, _elementRef: ElementRef);
}
