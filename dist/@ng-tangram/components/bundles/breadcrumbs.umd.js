(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.breadcrumbs = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtBreadcrumbsComponent = /** @class */ (function () {
        function NtBreadcrumbsComponent() {
        }
        NtBreadcrumbsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nt-breadcrumbs]',
                        template: "<ng-content></ng-content>",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            'class': 'breadcrumbs'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtBreadcrumbsComponent.ctorParameters = function () { return []; };
        return NtBreadcrumbsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtBreadcrumbsModule = /** @class */ (function () {
        function NtBreadcrumbsModule() {
        }
        NtBreadcrumbsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NtBreadcrumbsComponent],
                        exports: [NtBreadcrumbsComponent]
                    },] },
        ];
        /** @nocollapse */
        NtBreadcrumbsModule.ctorParameters = function () { return []; };
        return NtBreadcrumbsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtBreadcrumbsModule = NtBreadcrumbsModule;
    exports.NtBreadcrumbsComponent = NtBreadcrumbsComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=breadcrumbs.umd.js.map
