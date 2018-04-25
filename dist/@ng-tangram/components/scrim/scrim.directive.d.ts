import { ComponentFactoryResolver, ElementRef, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
export declare class NtScrimDirective implements OnDestroy {
    private _elementRef;
    private _renderer;
    private _componentFactoryResolver;
    private _viewContainerRef;
    private _componentRef;
    text: string;
    scrim: boolean;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _componentFactoryResolver: ComponentFactoryResolver, _viewContainerRef: ViewContainerRef);
    ngOnDestroy(): void;
}
