import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtLabelComponent = /** @class */ (function () {
    function NtLabelComponent() {
        this.color = '';
        this.class = '';
    }
    NtLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-label, [nt-label]',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '["label", color, class].join(" ")'
                    }
                },] },
    ];
    /** @nocollapse */
    NtLabelComponent.ctorParameters = function () { return []; };
    NtLabelComponent.propDecorators = {
        "color": [{ type: Input },],
        "class": [{ type: Input },],
    };
    return NtLabelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtLabelModule = /** @class */ (function () {
    function NtLabelModule() {
    }
    NtLabelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [NtLabelComponent],
                    exports: [NtLabelComponent]
                },] },
    ];
    /** @nocollapse */
    NtLabelModule.ctorParameters = function () { return []; };
    return NtLabelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtLabelModule, NtLabelComponent };
//# sourceMappingURL=label.js.map
