(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ng-tangram/animate/utils'), require('@ng-tangram/animate/fading')) :
	typeof define === 'function' && define.amd ? define(['exports', '@ng-tangram/animate/utils', '@ng-tangram/animate/fading'], factory) :
	(factory((global.nt = global.nt || {}, global.nt.animate = {}),global.nt.animate.utils,global.nt.animate.fading));
}(this, (function (exports,utils,fading) { 'use strict';

	/**
	 * @fileoverview added by tsickle
	 * @suppress {checkTypes} checked by tsc
	 */

	/**
	 * @fileoverview added by tsickle
	 * @suppress {checkTypes} checked by tsc
	 */

	exports.transformAxis = utils.transformAxis;
	exports.translate3d = utils.translate3d;
	exports.DEFAULT_TIMING = utils.DEFAULT_TIMING;
	exports.fade = fading.fade;
	exports.fadeInDirection = fading.fadeInDirection;
	exports.fadeInX = fading.fadeInX;
	exports.fadeInY = fading.fadeInY;
	exports.fadeIn = fading.fadeIn;
	exports.fadeInDown = fading.fadeInDown;
	exports.fadeInUp = fading.fadeInUp;
	exports.fadeInLeft = fading.fadeInLeft;
	exports.fadeInRight = fading.fadeInRight;
	exports.fadeOutDirection = fading.fadeOutDirection;
	exports.fadeOutX = fading.fadeOutX;
	exports.fadeOutY = fading.fadeOutY;
	exports.fadeOut = fading.fadeOut;
	exports.fadeOutDown = fading.fadeOutDown;
	exports.fadeOutUp = fading.fadeOutUp;
	exports.fadeOutLeft = fading.fadeOutLeft;
	exports.fadeOutRight = fading.fadeOutRight;
	exports.slideDirection = fading.slideDirection;
	exports.slideX = fading.slideX;
	exports.slideY = fading.slideY;
	exports.slideInDown = fading.slideInDown;
	exports.slideInUp = fading.slideInUp;
	exports.slideInLeft = fading.slideInLeft;
	exports.slideInRight = fading.slideInRight;
	exports.slideOutUp = fading.slideOutUp;
	exports.slideOutDown = fading.slideOutDown;
	exports.slideOutLeft = fading.slideOutLeft;
	exports.slideOutRight = fading.slideOutRight;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=animate.umd.js.map
