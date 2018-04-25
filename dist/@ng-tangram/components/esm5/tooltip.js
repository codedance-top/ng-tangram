import { OverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NtOverlayComponent, NtOverlayModule } from '@ng-tangram/components/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtTooltipComponent = /** @class */ (function () {
    function NtTooltipComponent(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._title = '';
        this.position = 'top';
        this.origin = new OverlayOrigin(_elementRef);
    }
    Object.defineProperty(NtTooltipComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () { return this._title; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._title = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtTooltipComponent.prototype, "_default", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._title = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtTooltipComponent.prototype, "_isDirective", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ attributes = this._elementRef.nativeElement.attributes;
            return attributes && attributes['nt-tooltip'];
        },
        enumerable: true,
        configurable: true
    });
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
    NtTooltipComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NtTooltipComponent.propDecorators = {
        "title": [{ type: Input },],
        "_default": [{ type: Input, args: ['nt-tooltip',] },],
        "position": [{ type: Input },],
        "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
    };
    return NtTooltipComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtTooltipModule = /** @class */ (function () {
    function NtTooltipModule() {
    }
    NtTooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, NtOverlayModule],
                    exports: [NtTooltipComponent],
                    declarations: [NtTooltipComponent]
                },] },
    ];
    /** @nocollapse */
    NtTooltipModule.ctorParameters = function () { return []; };
    return NtTooltipModule;
}());

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
