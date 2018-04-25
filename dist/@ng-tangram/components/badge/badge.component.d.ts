import { AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
export declare type NtBadgeColor = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtBadgeType = '' | 'static' | 'float' | 'notify';
export declare class NtBadgeComponent implements AfterViewInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _type;
    color: NtBadgeColor;
    class: string;
    type: NtBadgeType;
    private _originalPosition;
    constructor(_elementRef: ElementRef, _renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _resetPosition();
    private _clearPosition();
}
