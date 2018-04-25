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

export { transformAxis, translate3d, DEFAULT_TIMING };
//# sourceMappingURL=utils.js.map
