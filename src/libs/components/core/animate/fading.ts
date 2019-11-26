/**
 * @license ng-tangram
 * (c) 2018 LiveBridge Co., Ltd.
 * License: MIT
 */
import {
  animate,
  animation,
  AnimationReferenceMetadata,
  keyframes,
  style
} from '@angular/animations';

import { DEFAULT_TIMING, translate3d } from './utils';

export declare type FadeAnimationAxis = 'x' | 'y';
export declare type FadeAnimationSteps = { a: any, b: any };
export declare type FadeAnimationOptions = {

  // 起始透明度
  fromOpacity: number,

  // 结束时透明度
  toOpacity: number,

  // 动画方向信息
  axis: FadeAnimationAxis,

  // 动画移动距离
  steps: FadeAnimationSteps,

  // 动画执行时间，默认时间 0.5 秒
  timing?: number,

  // 延迟执行时间，默认时间 0 秒
  delay?: number
};

/**
 * 淡入淡出动画
 * @param options 动画配置参数
 */
export function fade(options: FadeAnimationOptions): AnimationReferenceMetadata {
  return animation(
    animate(`${options.timing || DEFAULT_TIMING}s ${options.delay || 0}s`,
    keyframes([
      style({ opacity: `${options.fromOpacity}`, transform: translate3d(options.axis, options.steps.a), offset: 0 }),
      style({ opacity: `${options.toOpacity}`, transform: translate3d(options.axis, options.steps.b), offset: 1 }),
    ])
  ));
}

/**
 * 带方向的淡入动画
 * @param axis 动画方向
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fade({ fromOpacity: 0, toOpacity: 1, axis, steps, timing, delay });
}

/**
 * 从 X 轴方向淡入
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInX(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeInDirection('x', steps, timing, delay);
}

/**
 * 从 Y 轴方向淡入
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInY(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeInDirection('y', steps, timing, delay);
}

/**
 * 静态淡入动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeIn(timing?: number, delay?: number) {
  return fadeInX({ a: 0, b: 0 }, timing, delay);
}

/**
 * 从下淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInDown(timing?: number, delay?: number) {
  return fadeInY({ a: '-100%', b: 0 }, timing, delay);
}

/**
 * 从上淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInUp(timing?: number, delay?: number) {
  return fadeInY({ a: '100%', b: 0 }, timing, delay);
}

/**
 * 从左淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInLeft(timing?: number, delay?: number) {
  return fadeInX({ a: '-100%', b: 0 }, timing, delay);
}

/**
 * 从右淡入的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeInRight(timing?: number, delay?: number) {
  return fadeInX({ a: '100%', b: 0 }, timing, delay);
}

/**
 * 带方向的淡出动画
 * @param axis 动画方向
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fade({ fromOpacity: 1, toOpacity: 0, axis, steps, timing, delay });
}

/**
 * 从 X 轴方向淡出
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutX(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeOutDirection('x', steps, timing, delay);
}

/**
 * 从 Y 轴方向淡出
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutY(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeOutDirection('y', steps, timing, delay);
}

/**
 * 静态淡出动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOut(timing?: number, delay?: number) {
  return fadeOutX({ a: 0, b: 0 }, timing, delay);
}

/**
 * 从下淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutDown(timing?: number, delay?: number) {
  return fadeOutY({ a: '-100%', b: 0 }, timing, delay);
}

/**
 * 从上淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutUp(timing?: number, delay?: number) {
  return fadeOutY({ a: '100%', b: 0 }, timing, delay);
}

/**
 * 从左淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutLeft(timing?: number, delay?: number) {
  return fadeOutX({ a: '-100%', b: 0 }, timing, delay);
}

/**
 * 从右淡出的动画
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function fadeOutRight(timing?: number, delay?: number) {
  return fadeOutX({ a: '100%', b: 0 }, timing, delay);
}

/**
 * 滑动动画
 * @param axis 动画方向
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fade({ fromOpacity: 1, toOpacity: 1, axis, steps, timing, delay });
}

/**
 * 从 X 轴方向滑动
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideX(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return slideDirection('x', steps, timing, delay);
}

/**
 * 从 Y 轴方向滑动
 * @param steps 动画移动距离
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideY(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return slideDirection('y', steps, timing, delay);
}

/**
 * 从下开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideInDown(timing?: number, delay?: number) {
  return slideY({ a: '100%', b: 0 }, timing, delay);
}

/**
 * 从上开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideInUp(timing?: number, delay?: number) {
  return slideY({ a: '-100%', b: 0 }, timing, delay);
}

/**
 * 从左开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideInLeft(timing?: number, delay?: number) {
  return slideX({ a: '-100%', b: 0 }, timing, delay);
}

/**
 * 从右开始滑动
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideInRight(timing?: number, delay?: number) {
  return slideX({ a: '100%', b: 0 }, timing, delay);
}

/**
 * 滑动到上面
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideOutUp(timing?: number, delay?: number) {
  return slideY({ a: 0, b: '-100%' }, timing, delay);
}

/**
 * 滑动到下面
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideOutDown(timing?: number, delay?: number) {
  return slideY({ a: 0, b: '100%' }, timing, delay);
}

/**
 * 滑动到左边
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideOutLeft(timing?: number, delay?: number) {
  return slideX({ a: 0, b: '-100%' }, timing, delay);
}

/**
 * 滑动到右边
 * @param timing 动画执行时间
 * @param delay 延迟执行时间
 */
export function slideOutRight(timing?: number, delay?: number) {
  return slideX({ a: 0, b: '100%' }, timing, delay);
}
