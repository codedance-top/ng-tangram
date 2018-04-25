import { Component, Input, NgModule } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

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
        function (value) { this._max = coerceNumberProperty(value, 100); },
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
        function (value) { this._value = coerceNumberProperty(value); },
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
        { type: Component, args: [{
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
        "max": [{ type: Input },],
        "value": [{ type: Input },],
        "size": [{ type: Input },],
        "color": [{ type: Input },],
        "class": [{ type: Input },],
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
        { type: NgModule, args: [{
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

export { NtProgressComponent, NtProgressModule };
//# sourceMappingURL=progress.js.map
