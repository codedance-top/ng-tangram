import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtButtonGroupComponent {
    constructor() {
        this._expanded = false;
        this.class = '';
        this.color = '';
        this.size = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) { this._expanded = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get expanded() { return this._expanded; }
}
NtButtonGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-button-group, [nt-button-group]',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class]': '["button-group", color, size, class].join(" ")',
                    '[class.expanded]': 'expanded'
                }
            },] },
];
/** @nocollapse */
NtButtonGroupComponent.ctorParameters = () => [];
NtButtonGroupComponent.propDecorators = {
    "class": [{ type: Input },],
    "color": [{ type: Input },],
    "size": [{ type: Input },],
    "expanded": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtButtonComponent {
    constructor() {
        this._style = '';
        this._expanded = false;
        this.class = '';
        this.color = '';
        this.size = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _default(value) {
        if (value && this._validStyle(value)) {
            this._style = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set style(value) { this._style = value; }
    /**
     * @return {?}
     */
    get style() { return this._style; }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) { this._expanded = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get expanded() { return this._expanded; }
    /**
     * @param {?} value
     * @return {?}
     */
    _validStyle(value) {
        return ['', 'hollow', 'clear'].indexOf(value) > -1;
    }
}
NtButtonComponent.decorators = [
    { type: Component, args: [{
                selector: '[nt-button]',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class]': '["button", color, style, size, class].join(" ")',
                    '[class.expanded]': 'expanded'
                }
            },] },
];
/** @nocollapse */
NtButtonComponent.ctorParameters = () => [];
NtButtonComponent.propDecorators = {
    "class": [{ type: Input },],
    "color": [{ type: Input },],
    "size": [{ type: Input },],
    "_default": [{ type: Input, args: ['nt-button',] },],
    "style": [{ type: Input },],
    "expanded": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtButtonModule {
}
NtButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtButtonComponent, NtButtonGroupComponent],
                declarations: [NtButtonComponent, NtButtonGroupComponent],
            },] },
];
/** @nocollapse */
NtButtonModule.ctorParameters = () => [];

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
