(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.icon = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtAntIconComponent = /** @class */ (function () {
        function NtAntIconComponent() {
        }
        NtAntIconComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-ant-icon',
                        template: '<i class="anticon icon-{{type}}"></i>',
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        NtAntIconComponent.ctorParameters = function () { return []; };
        NtAntIconComponent.propDecorators = {
            "type": [{ type: core.Input },],
        };
        return NtAntIconComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtIconModule = /** @class */ (function () {
        function NtIconModule() {
        }
        NtIconModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [NtAntIconComponent],
                        declarations: [NtAntIconComponent],
                        entryComponents: [NtAntIconComponent]
                    },] },
        ];
        /** @nocollapse */
        NtIconModule.ctorParameters = function () { return []; };
        return NtIconModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtIconModule = NtIconModule;
    exports.NtAntIconComponent = NtAntIconComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=icon.umd.js.map
