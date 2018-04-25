import { OverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef, Renderer2 } from '@angular/core';
import { NtOverlayComponent, NtOverlayPosition } from '@ng-tangram/components/core';
export declare class NtTooltipComponent {
    private _renderer;
    private _elementRef;
    private _title;
    readonly origin: OverlayOrigin;
    title: string;
    _default: string;
    readonly _isDirective: any;
    position: NtOverlayPosition;
    overlay: NtOverlayComponent;
    constructor(_renderer: Renderer2, _elementRef: ElementRef);
}
