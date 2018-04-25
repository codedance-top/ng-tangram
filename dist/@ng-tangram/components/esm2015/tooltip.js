import { OverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NtOverlayComponent, NtOverlayModule } from '@ng-tangram/components/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtTooltipComponent {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._title = '';
        this.position = 'top';
        this.origin = new OverlayOrigin(_elementRef);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) { this._title = value; }
    /**
     * @return {?}
     */
    get title() { return this._title; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _default(value) { this._title = value; }
    /**
     * @return {?}
     */
    get _isDirective() {
        const /** @type {?} */ attributes = this._elementRef.nativeElement.attributes;
        return attributes && attributes['nt-tooltip'];
    }
}
NtTooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-tooltip, [nt-tooltip]',
                template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" trigger=\"hover\" overlayClass=\"tootip-overlay\" arrow> <div class=\"tooltip\"> {{title}} </div> </nt-overlay> ",
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.tooltip-trigger]': '!_isDirective',
                    '(mouseenter)': 'overlay.onMouseEnter()',
                    '(mouseleave)': 'overlay.onMouseLeave()'
                }
            },] },
];
/** @nocollapse */
NtTooltipComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
NtTooltipComponent.propDecorators = {
    "title": [{ type: Input },],
    "_default": [{ type: Input, args: ['nt-tooltip',] },],
    "position": [{ type: Input },],
    "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtTooltipModule {
}
NtTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NtOverlayModule],
                exports: [NtTooltipComponent],
                declarations: [NtTooltipComponent]
            },] },
];
/** @nocollapse */
NtTooltipModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtTooltipModule, NtTooltipComponent };
//# sourceMappingURL=tooltip.js.map
