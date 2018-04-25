import { transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { fadeOut } from '@ng-tangram/animate/fading';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtCalloutComponent {
    constructor() {
        this._display = true;
        this.title = '';
        this.color = 'primary';
        this.size = 'medium';
        this.closed = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get display() { return this._display; }
    /**
     * @param {?} value
     * @return {?}
     */
    set closable(value) { this._closable = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get closable() { return this._closable; }
    /**
     * @return {?}
     */
    _close() {
        if (this._display) {
            this._display = false;
            this.closed.emit();
        }
    }
}
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
NtCalloutComponent.ctorParameters = () => [];
NtCalloutComponent.propDecorators = {
    "title": [{ type: Input },],
    "color": [{ type: Input },],
    "size": [{ type: Input },],
    "closable": [{ type: Input },],
    "closed": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtCalloutModule {
}
NtCalloutModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NtCalloutComponent],
                declarations: [NtCalloutComponent],
            },] },
];
/** @nocollapse */
NtCalloutModule.ctorParameters = () => [];

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
