import { OverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NtOverlayComponent, NtOverlayModule } from '@ng-tangram/components/core';
import { CommonModule } from '@angular/common';
import { NtIconModule } from '@ng-tangram/components/icon';
import { NtButtonModule } from '@ng-tangram/components/button';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPopConfirmComponent = /** @class */ (function () {
    function NtPopConfirmComponent(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.title = '';
        this.position = 'top';
        this.confirmText = '确认';
        this.cancelText = '取消';
        this.confirm = new EventEmitter();
        this.cancel = new EventEmitter();
        this.origin = new OverlayOrigin(_elementRef);
    }
    /**
     * @param {?} isConfirm
     * @return {?}
     */
    NtPopConfirmComponent.prototype._closeOverlay = /**
     * @param {?} isConfirm
     * @return {?}
     */
    function (isConfirm) {
        (isConfirm ? this.confirm : this.cancel).emit();
        this.overlay.hide();
    };
    NtPopConfirmComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nt-popconfirm]',
                    template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" trigger=\"click\" arrow> <nt-dropdown-pane> <p class=\"popconfirm\"><nt-ant-icon class=\"popconfirm-icon\" type=\"infocirlce\"></nt-ant-icon> {{ title }}</p> <div class=\"popconfirm-action\"> <button nt-button color=\"secondary\" size=\"tiny\" (click)=\"_closeOverlay(false)\">{{cancelText}}</button> <button nt-button size=\"tiny\" (click)=\"_closeOverlay(true)\">{{confirmText}}</button> </div> </nt-dropdown-pane> </nt-overlay> ",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(click)': 'overlay.click()'
                    }
                },] },
    ];
    /** @nocollapse */
    NtPopConfirmComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NtPopConfirmComponent.propDecorators = {
        "title": [{ type: Input, args: ['nt-popconfirm',] },],
        "position": [{ type: Input },],
        "confirmText": [{ type: Input },],
        "cancelText": [{ type: Input },],
        "confirm": [{ type: Output },],
        "cancel": [{ type: Output },],
        "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
    };
    return NtPopConfirmComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPopConfirmModule = /** @class */ (function () {
    function NtPopConfirmModule() {
    }
    NtPopConfirmModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, NtOverlayModule, NtIconModule, NtButtonModule, NtDropdownModule],
                    exports: [NtPopConfirmComponent],
                    declarations: [NtPopConfirmComponent]
                },] },
    ];
    /** @nocollapse */
    NtPopConfirmModule.ctorParameters = function () { return []; };
    return NtPopConfirmModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtPopConfirmModule, NtPopConfirmComponent };
//# sourceMappingURL=popconfirm.js.map
