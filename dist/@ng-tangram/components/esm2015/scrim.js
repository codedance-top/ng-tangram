import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, ViewEncapsulation, ComponentFactoryResolver, Directive, Renderer2, ViewContainerRef, NgModule } from '@angular/core';
import { fadeIn, fadeOut } from '@ng-tangram/animate/fading';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtScrimComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._isOpen = false;
        this.text = 'Loading...';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) { this._isOpen = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get isOpen() { return this._isOpen; }
}
NtScrimComponent.decorators = [
    { type: Component, args: [{
                selector: '[nt-scrim], nt-scrim',
                template: "<div class=\"nt-scrim\" *ngIf=\"isOpen\" [@fade]> <div class=\"nt-scrim-animation\"> <div class=\"sk-circle\"> <div class=\"sk-circle1 sk-child\"></div> <div class=\"sk-circle2 sk-child\"></div> <div class=\"sk-circle3 sk-child\"></div> <div class=\"sk-circle4 sk-child\"></div> <div class=\"sk-circle5 sk-child\"></div> <div class=\"sk-circle6 sk-child\"></div> <div class=\"sk-circle7 sk-child\"></div> <div class=\"sk-circle8 sk-child\"></div> <div class=\"sk-circle9 sk-child\"></div> <div class=\"sk-circle10 sk-child\"></div> <div class=\"sk-circle11 sk-child\"></div> <div class=\"sk-circle12 sk-child\"></div> </div> </div> <h3 class=\"nt-scrim-text\">{{ text }}</h3> </div> ",
                encapsulation: ViewEncapsulation.None,
                animations: [
                    trigger('fade', [
                        transition('void => *', fadeIn(.15)),
                        transition('* => void', fadeOut(.15))
                    ])
                ]
            },] },
];
/** @nocollapse */
NtScrimComponent.ctorParameters = () => [
    { type: ElementRef, },
];
NtScrimComponent.propDecorators = {
    "text": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtScrimDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     */
    constructor(_elementRef, _renderer, _componentFactoryResolver, _viewContainerRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
        const /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(NtScrimComponent);
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        const /** @type {?} */ style = window.getComputedStyle(this._elementRef.nativeElement);
        if (style.position !== 'absolute' || style.position !== 'absolute') {
            this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');
        }
        this._renderer.appendChild(this._elementRef.nativeElement, this._componentRef.location.nativeElement);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set text(value) { this._componentRef.instance.text = value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set scrim(value) { this._componentRef.instance.isOpen = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._renderer.removeChild(this._elementRef.nativeElement, this._componentRef.location.nativeElement);
        this._componentRef.destroy();
    }
}
NtScrimDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ntScrim]'
            },] },
];
/** @nocollapse */
NtScrimDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
];
NtScrimDirective.propDecorators = {
    "text": [{ type: Input, args: ['scrimText',] },],
    "scrim": [{ type: Input, args: ['ntScrim',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtScrimModule {
}
NtScrimModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                entryComponents: [NtScrimComponent],
                exports: [NtScrimComponent, NtScrimDirective],
                declarations: [NtScrimComponent, NtScrimDirective]
            },] },
];
/** @nocollapse */
NtScrimModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtScrimModule, NtScrimComponent, NtScrimDirective };
//# sourceMappingURL=scrim.js.map
