import { Component, Input, NgModule } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtProgressComponent {
    constructor() {
        this._max = 100;
        this._value = 0;
        this.size = 'medium';
        this.color = '';
        this.class = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) { this._max = coerceNumberProperty(value, 100); }
    /**
     * @return {?}
     */
    get max() { return this._max; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this._value = coerceNumberProperty(value); }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get percent() { return this.value / this.max * 100; }
}
NtProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-progress',
                template: `
    <span class="progress-meter" [style.width.%]="percent">
      <p class="progress-meter-text"><ng-content></ng-content></p>
    </span>
  `,
                host: {
                    '[class]': '["progress", color, size, class].join(" ")'
                }
            },] },
];
/** @nocollapse */
NtProgressComponent.ctorParameters = () => [];
NtProgressComponent.propDecorators = {
    "max": [{ type: Input },],
    "value": [{ type: Input },],
    "size": [{ type: Input },],
    "color": [{ type: Input },],
    "class": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtProgressModule {
}
NtProgressModule.decorators = [
    { type: NgModule, args: [{
                exports: [NtProgressComponent],
                declarations: [NtProgressComponent]
            },] },
];
/** @nocollapse */
NtProgressModule.ctorParameters = () => [];

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
