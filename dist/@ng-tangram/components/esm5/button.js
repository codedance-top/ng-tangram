import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        function (value) { this._expanded = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    NtButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-button-group, [nt-button-group]',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '["button-group", color, size, class].join(" ")',
                        '[class.expanded]': 'expanded'
                    }
                },] },
    ];
    /** @nocollapse */
    NtButtonGroupComponent.ctorParameters = function () { return []; };
    NtButtonGroupComponent.propDecorators = {
        "class": [{ type: Input },],
        "color": [{ type: Input },],
        "size": [{ type: Input },],
        "expanded": [{ type: Input },],
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
        function (value) { this._expanded = coerceBooleanProperty(value); },
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
        { type: Component, args: [{
                    selector: '[nt-button]',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '["button", color, style, size, class].join(" ")',
                        '[class.expanded]': 'expanded'
                    }
                },] },
    ];
    /** @nocollapse */
    NtButtonComponent.ctorParameters = function () { return []; };
    NtButtonComponent.propDecorators = {
        "class": [{ type: Input },],
        "color": [{ type: Input },],
        "size": [{ type: Input },],
        "_default": [{ type: Input, args: ['nt-button',] },],
        "style": [{ type: Input },],
        "expanded": [{ type: Input },],
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
        { type: NgModule, args: [{
                    imports: [CommonModule],
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

export { NtButtonModule, NtButtonComponent, NtButtonGroupComponent };
//# sourceMappingURL=button.js.map
