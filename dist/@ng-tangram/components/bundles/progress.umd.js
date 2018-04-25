(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/coercion'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.progress = {}),global.ng.core,global.ng.cdk.coercion));
}(this, (function (exports,core,coercion) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtProgressComponent = /** @class */ (function () {
        function NtProgressComponent() {
            this._max = 100;
            this._value = 0;
            this.size = 'medium';
            this.color = '';
            this.class = '';
        }
        Object.defineProperty(NtProgressComponent.prototype, "max", {
            get: /**
             * @return {?}
             */
            function () { return this._max; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._max = coercion.coerceNumberProperty(value, 100); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtProgressComponent.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._value = coercion.coerceNumberProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtProgressComponent.prototype, "percent", {
            get: /**
             * @return {?}
             */
            function () { return this.value / this.max * 100; },
            enumerable: true,
            configurable: true
        });
        NtProgressComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-progress',
                        template: "\n    <span class=\"progress-meter\" [style.width.%]=\"percent\">\n      <p class=\"progress-meter-text\"><ng-content></ng-content></p>\n    </span>\n  ",
                        host: {
                            '[class]': '["progress", color, size, class].join(" ")'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtProgressComponent.ctorParameters = function () { return []; };
        NtProgressComponent.propDecorators = {
            "max": [{ type: core.Input },],
            "value": [{ type: core.Input },],
            "size": [{ type: core.Input },],
            "color": [{ type: core.Input },],
            "class": [{ type: core.Input },],
        };
        return NtProgressComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtProgressModule = /** @class */ (function () {
        function NtProgressModule() {
        }
        NtProgressModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [NtProgressComponent],
                        declarations: [NtProgressComponent]
                    },] },
        ];
        /** @nocollapse */
        NtProgressModule.ctorParameters = function () { return []; };
        return NtProgressModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtProgressComponent = NtProgressComponent;
    exports.NtProgressModule = NtProgressModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=progress.umd.js.map
