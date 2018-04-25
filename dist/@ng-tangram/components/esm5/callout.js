import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { fadeOut } from '@ng-tangram/animate/fading';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtCalloutComponent = /** @class */ (function () {
    function NtCalloutComponent() {
        this._display = true;
        this.title = '';
        this.color = 'primary';
        this.size = 'medium';
        this.closed = new EventEmitter();
    }
    Object.defineProperty(NtCalloutComponent.prototype, "display", {
        get: /**
         * @return {?}
         */
        function () { return this._display; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NtCalloutComponent.prototype, "closable", {
        get: /**
         * @return {?}
         */
        function () { return this._closable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._closable = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NtCalloutComponent.prototype._close = /**
     * @return {?}
     */
    function () {
        if (this._display) {
            this._display = false;
            this.closed.emit();
        }
    };
    NtCalloutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-callout',
                    template: "<div *ngIf=\"display\" [@fadeOut] class=\"callout {{ size }} {{ color || 'primary' }}\"> <h3 *ngIf=\"title\">{{title}}</h3> <ng-content></ng-content> <button *ngIf=\"this.closable\" (click)=\"_close()\" class=\"close-button\" type=\"button\"> <span aria-hidden=\"true\">&times;</span> </button> </div> ",
                    encapsulation: ViewEncapsulation.None,
                    animations: [
                        trigger('fadeOut', [
                            transition('* => void', fadeOut(.3))
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NtCalloutComponent.ctorParameters = function () { return []; };
    NtCalloutComponent.propDecorators = {
        "title": [{ type: Input },],
        "color": [{ type: Input },],
        "size": [{ type: Input },],
        "closable": [{ type: Input },],
        "closed": [{ type: Output },],
    };
    return NtCalloutComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtCalloutModule = /** @class */ (function () {
    function NtCalloutModule() {
    }
    NtCalloutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [NtCalloutComponent],
                    declarations: [NtCalloutComponent],
                },] },
    ];
    /** @nocollapse */
    NtCalloutModule.ctorParameters = function () { return []; };
    return NtCalloutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtCalloutModule, NtCalloutComponent };
//# sourceMappingURL=callout.js.map
