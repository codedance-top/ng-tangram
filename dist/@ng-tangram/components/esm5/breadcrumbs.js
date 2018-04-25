import { Component, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtBreadcrumbsComponent = /** @class */ (function () {
    function NtBreadcrumbsComponent() {
    }
    NtBreadcrumbsComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nt-breadcrumbs]',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
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
        { type: NgModule, args: [{
                    imports: [CommonModule],
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

export { NtBreadcrumbsModule, NtBreadcrumbsComponent };
//# sourceMappingURL=breadcrumbs.js.map
