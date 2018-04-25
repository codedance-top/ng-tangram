import { OverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef, Renderer2 } from '@angular/core';
import { NtOverlayComponent } from '@ng-tangram/components/core';
export declare class NtPopoverComponent {
    private _renderer;
    private _elementRef;
    readonly origin: OverlayOrigin;
    title: string;
    position: string;
    overlay: NtOverlayComponent;
    constructor(_renderer: Renderer2, _elementRef: ElementRef);
}
