import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtAntIconComponent {
}
NtAntIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-ant-icon',
                template: '<i class="anticon icon-{{type}}"></i>',
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
NtAntIconComponent.ctorParameters = () => [];
NtAntIconComponent.propDecorators = {
    "type": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtIconModule {
}
NtIconModule.decorators = [
    { type: NgModule, args: [{
                exports: [NtAntIconComponent],
                declarations: [NtAntIconComponent],
                entryComponents: [NtAntIconComponent]
            },] },
];
/** @nocollapse */
NtIconModule.ctorParameters = () => [];

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
