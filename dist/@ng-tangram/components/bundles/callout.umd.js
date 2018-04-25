(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/core'), require('@ng-tangram/animate/fading'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/animations', '@angular/cdk/coercion', '@angular/core', '@ng-tangram/animate/fading', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.callout = {}),global.ng.animations,global.ng.cdk.coercion,global.ng.core,global.nt.animate.fading,global.ng.common));
}(this, (function (exports,animations,coercion,core,fading,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtCalloutComponent = /** @class */ (function () {
        function NtCalloutComponent() {
            this._display = true;
            this.title = '';
            this.color = 'primary';
            this.size = 'medium';
            this.closed = new core.EventEmitter();
        }
        Object.defineProperty(NtCalloutComponent.prototype, "display", {
            get: /**
             * @return {?}
             */
            function () { return this._display; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtCalloutComponent.prototype, "closable", {
            get: /**
             * @return {?}
             */
            function () { return this._closable; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._closable = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtCalloutComponent.prototype._close = /**
         * @return {?}
         */
        function () {
            if (this._display) {
                this._display = false;
                this.closed.emit();
            }
        };
        NtCalloutComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-callout',
                        template: "<div *ngIf=\"display\" [@fadeOut] class=\"callout {{ size }} {{ color || 'primary' }}\"> <h3 *ngIf=\"title\">{{title}}</h3> <ng-content></ng-content> <button *ngIf=\"this.closable\" (click)=\"_close()\" class=\"close-button\" type=\"button\"> <span aria-hidden=\"true\">&times;</span> </button> </div> ",
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [
                            animations.trigger('fadeOut', [
                                animations.transition('* => void', fading.fadeOut(.3))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtCalloutComponent.ctorParameters = function () { return []; };
        NtCalloutComponent.propDecorators = {
            "title": [{ type: core.Input },],
            "color": [{ type: core.Input },],
            "size": [{ type: core.Input },],
            "closable": [{ type: core.Input },],
            "closed": [{ type: core.Output },],
        };
        return NtCalloutComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtCalloutModule = /** @class */ (function () {
        function NtCalloutModule() {
        }
        NtCalloutModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [NtCalloutComponent],
                        declarations: [NtCalloutComponent],
                    },] },
        ];
        /** @nocollapse */
        NtCalloutModule.ctorParameters = function () { return []; };
        return NtCalloutModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtCalloutModule = NtCalloutModule;
    exports.NtCalloutComponent = NtCalloutComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=callout.umd.js.map
