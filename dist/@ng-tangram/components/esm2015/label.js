import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtLabelComponent {
    constructor() {
        this.color = '';
        this.class = '';
    }
}
NtLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-label, [nt-label]',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class]': '["label", color, class].join(" ")'
                }
            },] },
];
/** @nocollapse */
NtLabelComponent.ctorParameters = () => [];
NtLabelComponent.propDecorators = {
    "color": [{ type: Input },],
    "class": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtLabelModule {
}
NtLabelModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NtLabelComponent],
                exports: [NtLabelComponent]
            },] },
];
/** @nocollapse */
NtLabelModule.ctorParameters = () => [];

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
