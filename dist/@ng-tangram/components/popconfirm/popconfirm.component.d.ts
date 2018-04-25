import { OverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { NtOverlayComponent } from '@ng-tangram/components/core';
export declare class NtPopConfirmComponent {
    private _renderer;
    private _elementRef;
    readonly origin: OverlayOrigin;
    title: string;
    position: string;
    confirmText: string;
    cancelText: string;
    confirm: EventEmitter<any>;
    cancel: EventEmitter<any>;
    overlay: NtOverlayComponent;
    constructor(_renderer: Renderer2, _elementRef: ElementRef);
    _closeOverlay(isConfirm: boolean): void;
}
