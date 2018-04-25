(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/coercion', '@angular/core', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.button = {}),global.ng.cdk.coercion,global.ng.core,global.ng.common));
}(this, (function (exports,coercion,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtButtonGroupComponent = /** @class */ (function () {
        function NtButtonGroupComponent() {
            this._expanded = false;
            this.class = '';
            this.color = '';
            this.size = '';
        }
        Object.defineProperty(NtButtonGroupComponent.prototype, "expanded", {
            get: /**
             * @return {?}
             */
            function () { return this._expanded; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._expanded = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        NtButtonGroupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-button-group, [nt-button-group]',
                        template: "<ng-content></ng-content>",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class]': '["button-group", color, size, class].join(" ")',
                            '[class.expanded]': 'expanded'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtButtonGroupComponent.ctorParameters = function () { return []; };
        NtButtonGroupComponent.propDecorators = {
            "class": [{ type: core.Input },],
            "color": [{ type: core.Input },],
            "size": [{ type: core.Input },],
            "expanded": [{ type: core.Input },],
        };
        return NtButtonGroupComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtButtonComponent = /** @class */ (function () {
        function NtButtonComponent() {
            this._style = '';
            this._expanded = false;
            this.class = '';
            this.color = '';
            this.size = '';
        }
        Object.defineProperty(NtButtonComponent.prototype, "_default", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value && this._validStyle(value)) {
                    this._style = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtButtonComponent.prototype, "style", {
            get: /**
             * @return {?}
             */
            function () { return this._style; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._style = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtButtonComponent.prototype, "expanded", {
            get: /**
             * @return {?}
             */
            function () { return this._expanded; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._expanded = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        NtButtonComponent.prototype._validStyle = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return ['', 'hollow', 'clear'].indexOf(value) > -1;
        };
        NtButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nt-button]',
                        template: "<ng-content></ng-content>",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class]': '["button", color, style, size, class].join(" ")',
                            '[class.expanded]': 'expanded'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtButtonComponent.ctorParameters = function () { return []; };
        NtButtonComponent.propDecorators = {
            "class": [{ type: core.Input },],
            "color": [{ type: core.Input },],
            "size": [{ type: core.Input },],
            "_default": [{ type: core.Input, args: ['nt-button',] },],
            "style": [{ type: core.Input },],
            "expanded": [{ type: core.Input },],
        };
        return NtButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtButtonModule = /** @class */ (function () {
        function NtButtonModule() {
        }
        NtButtonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [NtButtonComponent, NtButtonGroupComponent],
                        declarations: [NtButtonComponent, NtButtonGroupComponent],
                    },] },
        ];
        /** @nocollapse */
        NtButtonModule.ctorParameters = function () { return []; };
        return NtButtonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtButtonModule = NtButtonModule;
    exports.NtButtonComponent = NtButtonComponent;
    exports.NtButtonGroupComponent = NtButtonGroupComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=button.umd.js.map
