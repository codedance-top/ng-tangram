(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/coercion', '@angular/core', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.menu = {}),global.ng.cdk.coercion,global.ng.core,global.ng.common));
}(this, (function (exports,coercion,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtMenuComponent = /** @class */ (function () {
        function NtMenuComponent() {
            this._simple = false;
            this._expanded = false;
            this._nested = false;
            this._align = '';
            this.class = '';
            this.orientation = '';
        }
        Object.defineProperty(NtMenuComponent.prototype, "simple", {
            get: /**
             * @return {?}
             */
            function () { return this._simple; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._simple = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtMenuComponent.prototype, "expanded", {
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
        Object.defineProperty(NtMenuComponent.prototype, "nested", {
            get: /**
             * @return {?}
             */
            function () { return this._nested; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._nested = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtMenuComponent.prototype, "align", {
            get: /**
             * @return {?}
             */
            function () { return this._align; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._align = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtMenuComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.childMenus.toArray()
                .filter(function (menu) { return menu !== _this; })
                .forEach(function (menu) { return menu.nested = true; });
        };
        NtMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nt-menu]',
                        template: '<ng-content></ng-content>',
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class]': '["menu", align ? "align-" + align : "", orientation, class].join(" ")',
                            '[class.simple]': 'simple',
                            '[class.expanded]': 'expanded',
                            '[class.nested]': 'nested'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtMenuComponent.ctorParameters = function () { return []; };
        NtMenuComponent.propDecorators = {
            "class": [{ type: core.Input },],
            "simple": [{ type: core.Input },],
            "expanded": [{ type: core.Input },],
            "align": [{ type: core.Input },],
            "orientation": [{ type: core.Input },],
            "childMenus": [{ type: core.ContentChildren, args: [NtMenuComponent,] },],
        };
        return NtMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtMenuModule = /** @class */ (function () {
        function NtMenuModule() {
        }
        NtMenuModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [NtMenuComponent],
                        declarations: [NtMenuComponent]
                    },] },
        ];
        /** @nocollapse */
        NtMenuModule.ctorParameters = function () { return []; };
        return NtMenuModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtMenuModule = NtMenuModule;
    exports.NtMenuComponent = NtMenuComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=menu.umd.js.map
