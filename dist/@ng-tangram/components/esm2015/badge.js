import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtBadgeComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._type = 'static';
        this.color = '';
        this.class = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (value === 'float' || value === 'notify') {
            this._resetPosition();
        }
        else {
            this._clearPosition();
        }
        this._type = value;
    }
    /**
     * @return {?}
     */
    get type() { return this._type; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._resetPosition();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._clearPosition();
    }
    /**
     * @return {?}
     */
    _resetPosition() {
        const /** @type {?} */ style = window.getComputedStyle(this._elementRef.nativeElement.parentElement);
        if (style.position !== 'absolute' || style.position !== 'absolute') {
            this._originalPosition = style.position;
            this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'position', 'relative');
        }
    }
    /**
     * @return {?}
     */
    _clearPosition() {
        if (this._originalPosition) {
            this._renderer.removeStyle(this._elementRef.nativeElement.parentElement, 'position');
        }
    }
}
NtBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-badge, [nt-badge]',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class]': '["badge", color, class].join(" ")',
                    '[class.badge-float]': 'type === "float"',
                    '[class.badge-notify]': 'type === "notify"'
                }
            },] },
];
/** @nocollapse */
NtBadgeComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
NtBadgeComponent.propDecorators = {
    "color": [{ type: Input },],
    "class": [{ type: Input },],
    "type": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtBadgeModule {
}
NtBadgeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NtBadgeComponent],
                exports: [NtBadgeComponent]
            },] },
];
/** @nocollapse */
NtBadgeModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtBadgeModule, NtBadgeComponent };
//# sourceMappingURL=badge.js.map
