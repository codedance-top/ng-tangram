/**
 * @license ng-tangram
 * (c) 2018 LiveBridge Co., Ltd.
 * License: MIT
 */
import { AnimationReferenceMetadata } from '@angular/animations';
export declare type FadeAnimationAxis = 'x' | 'y';
export declare type FadeAnimationSteps = {
    a: any;
    b: any;
};
export declare type FadeAnimationOptions = {
    fromOpacity: number;
    toOpacity: number;
    axis: FadeAnimationAxis;
    steps: FadeAnimationSteps;
    timing?: number;
    delay?: number;
};
/**
 * 淡入淡出动画
 * @param options 动画配置参数
 */
export declare function fade(options: FadeAnimationOptions): AnimationReferenceMetadata;
/**
 * 带方向的淡入动画
 * @param axis 动画方向
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从 X 轴方向淡入
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInX(steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从 Y 轴方向淡入
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInY(steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 静态淡入动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeIn(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从下淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInDown(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从上淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInUp(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从左淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInLeft(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从右淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeInRight(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 带方向的淡出动画
 * @param axis 动画方向
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从 X 轴方向淡出
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutX(steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从 Y 轴方向淡出
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutY(steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 静态淡出动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOut(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从下淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutDown(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从上淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutUp(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从左淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutLeft(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从右淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function fadeOutRight(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 滑动动画
 * @param axis 动画方向
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从 X 轴方向滑动
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideX(steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从 Y 轴方向滑动
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideY(steps: FadeAnimationSteps, timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从下开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideInDown(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从上开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideInUp(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从左开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideInLeft(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 从右开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideInRight(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 滑动到上面
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideOutUp(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 滑动到下面
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideOutDown(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 滑动到左边
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideOutLeft(timing?: number, delay?: number): AnimationReferenceMetadata;
/**
 * 滑动到右边
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export declare function slideOutRight(timing?: number, delay?: number): AnimationReferenceMetadata;
