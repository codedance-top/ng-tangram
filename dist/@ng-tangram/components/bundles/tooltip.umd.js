(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/core'), require('@ng-tangram/components/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/overlay', '@angular/core', '@ng-tangram/components/core', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.tooltip = {}),global.ng.cdk.overlay,global.ng.core,global.nt.components.core,global.ng.common));
}(this, (function (exports,overlay,core,core$1,common) { 'use strict';

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
            this.origin = new overlay.OverlayOrigin(_elementRef);
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
            { type: core.Component, args: [{
                        selector: 'nt-tooltip, [nt-tooltip]',
                        template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" trigger=\"hover\" overlayClass=\"tootip-overlay\" arrow> <div class=\"tooltip\"> {{title}} </div> </nt-overlay> ",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class.tooltip-trigger]': '!_isDirective',
                            '(mouseenter)': 'overlay.onMouseEnter()',
                            '(mouseleave)': 'overlay.onMouseLeave()'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtTooltipComponent.ctorParameters = function () { return [
            { type: core.Renderer2, },
            { type: core.ElementRef, },
        ]; };
        NtTooltipComponent.propDecorators = {
            "title": [{ type: core.Input },],
            "_default": [{ type: core.Input, args: ['nt-tooltip',] },],
            "position": [{ type: core.Input },],
            "overlay": [{ type: core.ViewChild, args: [core$1.NtOverlayComponent,] },],
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, core$1.NtOverlayModule],
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

    exports.NtTooltipModule = NtTooltipModule;
    exports.NtTooltipComponent = NtTooltipComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tooltip.umd.js.map
