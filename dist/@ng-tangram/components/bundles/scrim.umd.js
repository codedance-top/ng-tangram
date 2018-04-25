(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/animations'), require('@angular/core'), require('@ng-tangram/animate/fading'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/coercion', '@angular/animations', '@angular/core', '@ng-tangram/animate/fading', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.scrim = {}),global.ng.cdk.coercion,global.ng.animations,global.ng.core,global.nt.animate.fading,global.ng.common));
}(this, (function (exports,coercion,animations,core,fading,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtScrimComponent = /** @class */ (function () {
        function NtScrimComponent(elementRef) {
            this.elementRef = elementRef;
            this._isOpen = false;
            this.text = 'Loading...';
        }
        Object.defineProperty(NtScrimComponent.prototype, "isOpen", {
            get: /**
             * @return {?}
             */
            function () { return this._isOpen; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._isOpen = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        NtScrimComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nt-scrim], nt-scrim',
                        template: "<div class=\"nt-scrim\" *ngIf=\"isOpen\" [@fade]> <div class=\"nt-scrim-animation\"> <div class=\"sk-circle\"> <div class=\"sk-circle1 sk-child\"></div> <div class=\"sk-circle2 sk-child\"></div> <div class=\"sk-circle3 sk-child\"></div> <div class=\"sk-circle4 sk-child\"></div> <div class=\"sk-circle5 sk-child\"></div> <div class=\"sk-circle6 sk-child\"></div> <div class=\"sk-circle7 sk-child\"></div> <div class=\"sk-circle8 sk-child\"></div> <div class=\"sk-circle9 sk-child\"></div> <div class=\"sk-circle10 sk-child\"></div> <div class=\"sk-circle11 sk-child\"></div> <div class=\"sk-circle12 sk-child\"></div> </div> </div> <h3 class=\"nt-scrim-text\">{{ text }}</h3> </div> ",
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [
                            animations.trigger('fade', [
                                animations.transition('void => *', fading.fadeIn(.15)),
                                animations.transition('* => void', fading.fadeOut(.15))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtScrimComponent.ctorParameters = function () { return [
            { type: core.ElementRef, },
        ]; };
        NtScrimComponent.propDecorators = {
            "text": [{ type: core.Input },],
        };
        return NtScrimComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtScrimDirective = /** @class */ (function () {
        function NtScrimDirective(_elementRef, _renderer, _componentFactoryResolver, _viewContainerRef) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._viewContainerRef = _viewContainerRef;
            var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(NtScrimComponent);
            this._componentRef = this._viewContainerRef.createComponent(componentFactory);
            var /** @type {?} */ style = window.getComputedStyle(this._elementRef.nativeElement);
            if (style.position !== 'absolute' || style.position !== 'absolute') {
                this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');
            }
            this._renderer.appendChild(this._elementRef.nativeElement, this._componentRef.location.nativeElement);
        }
        Object.defineProperty(NtScrimDirective.prototype, "text", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._componentRef.instance.text = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtScrimDirective.prototype, "scrim", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._componentRef.instance.isOpen = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtScrimDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._renderer.removeChild(this._elementRef.nativeElement, this._componentRef.location.nativeElement);
            this._componentRef.destroy();
        };
        NtScrimDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ntScrim]'
                    },] },
        ];
        /** @nocollapse */
        NtScrimDirective.ctorParameters = function () { return [
            { type: core.ElementRef, },
            { type: core.Renderer2, },
            { type: core.ComponentFactoryResolver, },
            { type: core.ViewContainerRef, },
        ]; };
        NtScrimDirective.propDecorators = {
            "text": [{ type: core.Input, args: ['scrimText',] },],
            "scrim": [{ type: core.Input, args: ['ntScrim',] },],
        };
        return NtScrimDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtScrimModule = /** @class */ (function () {
        function NtScrimModule() {
        }
        NtScrimModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        entryComponents: [NtScrimComponent],
                        exports: [NtScrimComponent, NtScrimDirective],
                        declarations: [NtScrimComponent, NtScrimDirective]
                    },] },
        ];
        /** @nocollapse */
        NtScrimModule.ctorParameters = function () { return []; };
        return NtScrimModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtScrimModule = NtScrimModule;
    exports.NtScrimComponent = NtScrimComponent;
    exports.NtScrimDirective = NtScrimDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=scrim.umd.js.map
