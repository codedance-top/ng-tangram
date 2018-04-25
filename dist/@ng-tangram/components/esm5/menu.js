import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        function (value) { this._simple = coerceBooleanProperty(value); },
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
        function (value) { this._expanded = coerceBooleanProperty(value); },
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
        function (value) { this._nested = coerceBooleanProperty(value); },
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
        { type: Component, args: [{
                    selector: '[nt-menu]',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
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
        "class": [{ type: Input },],
        "simple": [{ type: Input },],
        "expanded": [{ type: Input },],
        "align": [{ type: Input },],
        "orientation": [{ type: Input },],
        "childMenus": [{ type: ContentChildren, args: [NtMenuComponent,] },],
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
        { type: NgModule, args: [{
                    imports: [CommonModule],
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

export { NtMenuModule, NtMenuComponent };
//# sourceMappingURL=menu.js.map
