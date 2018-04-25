(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.label = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtLabelComponent = /** @class */ (function () {
        function NtLabelComponent() {
            this.color = '';
            this.class = '';
        }
        NtLabelComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-label, [nt-label]',
                        template: "<ng-content></ng-content>",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class]': '["label", color, class].join(" ")'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtLabelComponent.ctorParameters = function () { return []; };
        NtLabelComponent.propDecorators = {
            "color": [{ type: core.Input },],
            "class": [{ type: core.Input },],
        };
        return NtLabelComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtLabelModule = /** @class */ (function () {
        function NtLabelModule() {
        }
        NtLabelModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NtLabelComponent],
                        exports: [NtLabelComponent]
                    },] },
        ];
        /** @nocollapse */
        NtLabelModule.ctorParameters = function () { return []; };
        return NtLabelModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtLabelModule = NtLabelModule;
    exports.NtLabelComponent = NtLabelComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=label.umd.js.map
