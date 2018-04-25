import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtBadgeComponent = /** @class */ (function () {
    function NtBadgeComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._type = 'static';
        this.color = '';
        this.class = '';
    }
    Object.defineProperty(NtBadgeComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return this._type; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === 'float' || value === 'notify') {
                this._resetPosition();
            }
            else {
                this._clearPosition();
            }
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NtBadgeComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._resetPosition();
    };
    /**
     * @return {?}
     */
    NtBadgeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._clearPosition();
    };
    /**
     * @return {?}
     */
    NtBadgeComponent.prototype._resetPosition = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ style = window.getComputedStyle(this._elementRef.nativeElement.parentElement);
        if (style.position !== 'absolute' || style.position !== 'absolute') {
            this._originalPosition = style.position;
            this._renderer.setStyle(this._elementRef.nativeElement.parentElement, 'position', 'relative');
        }
    };
    /**
     * @return {?}
     */
    NtBadgeComponent.prototype._clearPosition = /**
     * @return {?}
     */
    function () {
        if (this._originalPosition) {
            this._renderer.removeStyle(this._elementRef.nativeElement.parentElement, 'position');
        }
    };
    NtBadgeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-badge, [nt-badge]',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '["badge", color, class].join(" ")',
                        '[class.badge-float]': 'type === "float"',
                        '[class.badge-notify]': 'type === "notify"'
                    }
                },] },
    ];
    /** @nocollapse */
    NtBadgeComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    NtBadgeComponent.propDecorators = {
        "color": [{ type: Input },],
        "class": [{ type: Input },],
        "type": [{ type: Input },],
    };
    return NtBadgeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtBadgeModule = /** @class */ (function () {
    function NtBadgeModule() {
    }
    NtBadgeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [NtBadgeComponent],
                    exports: [NtBadgeComponent]
                },] },
    ];
    /** @nocollapse */
    NtBadgeModule.ctorParameters = function () { return []; };
    return NtBadgeModule;
}());

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
