import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtMenuComponent {
    constructor() {
        this._simple = false;
        this._expanded = false;
        this._nested = false;
        this._align = '';
        this.class = '';
        this.orientation = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set simple(value) { this._simple = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get simple() { return this._simple; }
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
    set nested(value) { this._nested = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get nested() { return this._nested; }
    /**
     * @param {?} value
     * @return {?}
     */
    set align(value) { this._align = value; }
    /**
     * @return {?}
     */
    get align() { return this._align; }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.childMenus.toArray()
            .filter(menu => menu !== this)
            .forEach(menu => menu.nested = true);
    }
}
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
NtMenuComponent.ctorParameters = () => [];
NtMenuComponent.propDecorators = {
    "class": [{ type: Input },],
    "simple": [{ type: Input },],
    "expanded": [{ type: Input },],
    "align": [{ type: Input },],
    "orientation": [{ type: Input },],
    "childMenus": [{ type: ContentChildren, args: [NtMenuComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtMenuModule {
}
NtMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtMenuComponent],
                declarations: [NtMenuComponent]
            },] },
];
/** @nocollapse */
NtMenuModule.ctorParameters = () => [];

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
