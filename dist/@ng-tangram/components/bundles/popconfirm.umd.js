(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/overlay'), require('@angular/core'), require('@ng-tangram/components/core'), require('@angular/common'), require('@ng-tangram/components/icon'), require('@ng-tangram/components/button'), require('@ng-tangram/components/dropdown')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/cdk/overlay', '@angular/core', '@ng-tangram/components/core', '@angular/common', '@ng-tangram/components/icon', '@ng-tangram/components/button', '@ng-tangram/components/dropdown'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.popconfirm = {}),global.ng.cdk.overlay,global.ng.core,global.nt.components.core,global.ng.common,global.nt.components.icon,global.nt.components.button,global.nt.components.dropdown));
}(this, (function (exports,overlay,core,core$1,common,icon,button,dropdown) { 'use strict';

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
            this.confirm = new core.EventEmitter();
            this.cancel = new core.EventEmitter();
            this.origin = new overlay.OverlayOrigin(_elementRef);
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
            { type: core.Component, args: [{
                        selector: '[nt-popconfirm]',
                        template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" trigger=\"click\" arrow> <nt-dropdown-pane> <p class=\"popconfirm\"><nt-ant-icon class=\"popconfirm-icon\" type=\"infocirlce\"></nt-ant-icon> {{ title }}</p> <div class=\"popconfirm-action\"> <button nt-button color=\"secondary\" size=\"tiny\" (click)=\"_closeOverlay(false)\">{{cancelText}}</button> <button nt-button size=\"tiny\" (click)=\"_closeOverlay(true)\">{{confirmText}}</button> </div> </nt-dropdown-pane> </nt-overlay> ",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '(click)': 'overlay.click()'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtPopConfirmComponent.ctorParameters = function () { return [
            { type: core.Renderer2, },
            { type: core.ElementRef, },
        ]; };
        NtPopConfirmComponent.propDecorators = {
            "title": [{ type: core.Input, args: ['nt-popconfirm',] },],
            "position": [{ type: core.Input },],
            "confirmText": [{ type: core.Input },],
            "cancelText": [{ type: core.Input },],
            "confirm": [{ type: core.Output },],
            "cancel": [{ type: core.Output },],
            "overlay": [{ type: core.ViewChild, args: [core$1.NtOverlayComponent,] },],
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, core$1.NtOverlayModule, icon.NtIconModule, button.NtButtonModule, dropdown.NtDropdownModule],
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

    exports.NtPopConfirmModule = NtPopConfirmModule;
    exports.NtPopConfirmComponent = NtPopConfirmComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=popconfirm.umd.js.map
