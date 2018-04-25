import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtAntIconComponent = /** @class */ (function () {
    function NtAntIconComponent() {
    }
    NtAntIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-ant-icon',
                    template: '<i class="anticon icon-{{type}}"></i>',
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NtAntIconComponent.ctorParameters = function () { return []; };
    NtAntIconComponent.propDecorators = {
        "type": [{ type: Input },],
    };
    return NtAntIconComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtIconModule = /** @class */ (function () {
    function NtIconModule() {
    }
    NtIconModule.decorators = [
        { type: NgModule, args: [{
                    exports: [NtAntIconComponent],
                    declarations: [NtAntIconComponent],
                    entryComponents: [NtAntIconComponent]
                },] },
    ];
    /** @nocollapse */
    NtIconModule.ctorParameters = function () { return []; };
    return NtIconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtIconModule, NtAntIconComponent };
//# sourceMappingURL=icon.js.map
