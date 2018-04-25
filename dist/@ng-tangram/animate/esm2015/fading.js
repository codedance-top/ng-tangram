import { animation, style, animate, keyframes } from '@angular/animations';
import { DEFAULT_TIMING, translate3d } from '@ng-tangram/animate/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 淡入淡出动画
 * @param {?} options 动画配置参数
 * @return {?}
 */
function fade(options) {
    return animation(animate(`${options.timing || DEFAULT_TIMING}s ${options.delay || 0}s`, keyframes([
        style({ opacity: `${options.fromOpacity}`, transform: translate3d(options.axis, options.steps.a), offset: 0 }),
        style({ opacity: `${options.toOpacity}`, transform: translate3d(options.axis, options.steps.b), offset: 1 }),
    ])));
}
/**
 * 带方向的淡入动画
 * @param {?} axis 动画方向
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInDirection(axis, steps, timing, delay) {
    return fade({ fromOpacity: 0, toOpacity: 1, axis, steps, timing, delay });
}
/**
 * 从 X 轴方向淡入
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInX(steps, timing, delay) {
    return fadeInDirection('x', steps, timing, delay);
}
/**
 * 从 Y 轴方向淡入
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInY(steps, timing, delay) {
    return fadeInDirection('y', steps, timing, delay);
}
/**
 * 静态淡入动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeIn(timing, delay) {
    return fadeInX({ a: 0, b: 0 }, timing, delay);
}
/**
 * 从下淡入的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInDown(timing, delay) {
    return fadeInY({ a: '-100%', b: 0 }, timing, delay);
}
/**
 * 从上淡入的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInUp(timing, delay) {
    return fadeInY({ a: '100%', b: 0 }, timing, delay);
}
/**
 * 从左淡入的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInLeft(timing, delay) {
    return fadeInX({ a: '-100%', b: 0 }, timing, delay);
}
/**
 * 从右淡入的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeInRight(timing, delay) {
    return fadeInX({ a: '100%', b: 0 }, timing, delay);
}
/**
 * 带方向的淡出动画
 * @param {?} axis 动画方向
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutDirection(axis, steps, timing, delay) {
    return fade({ fromOpacity: 1, toOpacity: 0, axis, steps, timing, delay });
}
/**
 * 从 X 轴方向淡出
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutX(steps, timing, delay) {
    return fadeOutDirection('x', steps, timing, delay);
}
/**
 * 从 Y 轴方向淡出
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutY(steps, timing, delay) {
    return fadeOutDirection('y', steps, timing, delay);
}
/**
 * 静态淡出动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOut(timing, delay) {
    return fadeOutX({ a: 0, b: 0 }, timing, delay);
}
/**
 * 从下淡出的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutDown(timing, delay) {
    return fadeOutY({ a: '-100%', b: 0 }, timing, delay);
}
/**
 * 从上淡出的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutUp(timing, delay) {
    return fadeOutY({ a: '100%', b: 0 }, timing, delay);
}
/**
 * 从左淡出的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutLeft(timing, delay) {
    return fadeOutX({ a: '-100%', b: 0 }, timing, delay);
}
/**
 * 从右淡出的动画
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function fadeOutRight(timing, delay) {
    return fadeOutX({ a: '100%', b: 0 }, timing, delay);
}
/**
 * 滑动动画
 * @param {?} axis 动画方向
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideDirection(axis, steps, timing, delay) {
    return fade({ fromOpacity: 1, toOpacity: 1, axis, steps, timing, delay });
}
/**
 * 从 X 轴方向滑动
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideX(steps, timing, delay) {
    return slideDirection('x', steps, timing, delay);
}
/**
 * 从 Y 轴方向滑动
 * @param {?} steps 动画移动距离
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideY(steps, timing, delay) {
    return slideDirection('y', steps, timing, delay);
}
/**
 * 从下开始滑动
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideInDown(timing, delay) {
    return slideY({ a: '100%', b: 0 }, timing, delay);
}
/**
 * 从上开始滑动
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideInUp(timing, delay) {
    return slideY({ a: '-100%', b: 0 }, timing, delay);
}
/**
 * 从左开始滑动
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideInLeft(timing, delay) {
    return slideX({ a: '-100%', b: 0 }, timing, delay);
}
/**
 * 从右开始滑动
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideInRight(timing, delay) {
    return slideX({ a: '100%', b: 0 }, timing, delay);
}
/**
 * 滑动到上面
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideOutUp(timing, delay) {
    return slideY({ a: 0, b: '-100%' }, timing, delay);
}
/**
 * 滑动到下面
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideOutDown(timing, delay) {
    return slideY({ a: 0, b: '100%' }, timing, delay);
}
/**
 * 滑动到左边
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideOutLeft(timing, delay) {
    return slideX({ a: 0, b: '-100%' }, timing, delay);
}
/**
 * 滑动到右边
 * @param {?=} timing 动画执行时间
 * @param {?=} delay 延迟执行时间
 * @return {?}
 */
function slideOutRight(timing, delay) {
    return slideX({ a: 0, b: '100%' }, timing, delay);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { fade, fadeInDirection, fadeInX, fadeInY, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, fadeOutDirection, fadeOutX, fadeOutY, fadeOut, fadeOutDown, fadeOutUp, fadeOutLeft, fadeOutRight, slideDirection, slideX, slideY, slideInDown, slideInUp, slideInLeft, slideInRight, slideOutUp, slideOutDown, slideOutLeft, slideOutRight };
//# sourceMappingURL=fading.js.map
