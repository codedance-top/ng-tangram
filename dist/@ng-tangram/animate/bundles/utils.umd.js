(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.animate = global.nt.animate || {}, global.nt.animate.utils = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @param {?} name
     * @param {?} axis
     * @param {?} letter
     * @return {?}
     */
    function transformAxis(name, axis, letter) {
        return axis === 'x'
            ? name + "(" + letter + ", 0, 0)"
            : name + "(0, " + letter + ", 0)";
    }
    /**
     * @param {?} axis
     * @param {?} letter
     * @return {?}
     */
    function translate3d(axis, letter) {
        return transformAxis('translate3d', axis, letter);
    }
    var /** @type {?} */ DEFAULT_TIMING = .5;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.transformAxis = transformAxis;
    exports.translate3d = translate3d;
    exports.DEFAULT_TIMING = DEFAULT_TIMING;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=utils.umd.js.map
