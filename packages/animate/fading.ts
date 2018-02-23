import { animation, style, animate, keyframes } from '@angular/animations';
import { DEFAULT_TIMING, translate3d } from './utils';

declare type FadeAnimationAxis = 'x' | 'y';
declare type FadeAnimationSteps = { a: any, b: any };
declare type FadeAnimationOptions = {
  fromOpacity: number,
  toOpacity: number,
  axis: FadeAnimationAxis,
  steps: FadeAnimationSteps,
  timing?: number,
  delay?: number
};

export function fade(options: FadeAnimationOptions) {
  return animation(animate(`${options.timing || DEFAULT_TIMING}s ${options.delay || 0}s`,
    keyframes([
      style({ opacity: `${options.fromOpacity}`, transform: translate3d(options.axis, options.steps.a), offset: 0 }),
      style({ opacity: `${options.toOpacity}`, transform: translate3d(options.axis, options.steps.b), offset: 1 }),
    ])
  ));
}

export function fadeInDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fade({ fromOpacity: 0, toOpacity: 1, axis, steps, timing, delay });
}
export function fadeInX(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeInDirection('x', steps, timing, delay);
}
export function fadeInY(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeInDirection('y', steps, timing, delay);
}

export function fadeIn(timing?: number, delay?: number) {
  return fadeInX({ a: 0, b: 0 }, timing, delay);
}
export function fadeInDown(timing?: number, delay?: number) {
  return fadeInY({ a: '-100%', b: 0 }, timing, delay);
}
export function fadeInUp(timing?: number, delay?: number) {
  return fadeInY({ a: '100%', b: 0 }, timing, delay);
}
export function fadeInLeft(timing?: number, delay?: number) {
  return fadeInX({ a: '-100%', b: 0 }, timing, delay);
}
export function fadeInRight(timing?: number, delay?: number) {
  return fadeInX({ a: '100%', b: 0 }, timing, delay);
}

export function fadeOutDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fade({ fromOpacity: 1, toOpacity: 0, axis, steps, timing, delay });
}
export function fadeOutX(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeOutDirection('x', steps, timing, delay);
}
export function fadeOutY(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fadeOutDirection('y', steps, timing, delay);
}

export function fadeOut(timing?: number, delay?: number) {
  return fadeOutX({ a: 0, b: 0 }, timing, delay);
}
export function fadeOutDown(timing?: number, delay?: number) {
  return fadeOutY({ a: '-100%', b: 0 }, timing, delay);
}
export function fadeOutUp(timing?: number, delay?: number) {
  return fadeOutY({ a: '100%', b: 0 }, timing, delay);
}
export function fadeOutLeft(timing?: number, delay?: number) {
  return fadeOutX({ a: '-100%', b: 0 }, timing, delay);
}
export function fadeOutRight(timing?: number, delay?: number) {
  return fadeOutX({ a: '100%', b: 0 }, timing, delay);
}

export function slideDirection(axis: FadeAnimationAxis, steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return fade({ fromOpacity: 1, toOpacity: 1, axis, steps, timing, delay });
}
export function slideX(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return slideDirection('x', steps, timing, delay);
}
export function slideY(steps: FadeAnimationSteps, timing?: number, delay?: number) {
  return slideDirection('y', steps, timing, delay);
}

export function slideInUp(timing?: number, delay?: number) {
  return slideY({ a: '-100%', b: 0 }, timing, delay);
}
export function slideInDown(timing?: number, delay?: number) {
  return slideY({ a: '100%', b: 0 }, timing, delay);
}
export function slideInLeft(timing?: number, delay?: number) {
  return slideX({ a: '-100%', b: 0 }, timing, delay);
}
export function slideInRight(timing?: number, delay?: number) {
  return slideX({ a: '100%', b: 0 }, timing, delay);
}
export function slideOutUp(timing?: number, delay?: number) {
  return slideY({ a: 0, b: '-100%' }, timing, delay);
}
export function slideOutDown(timing?: number, delay?: number) {
  return slideY({ a: 0, b: '100%' }, timing, delay);
}
export function slideOutLeft(timing?: number, delay?: number) {
  return slideX({ a: 0, b: '-100%' }, timing, delay);
}
export function slideOutRight(timing?: number, delay?: number) {
  return slideX({ a: 0, b: '100%' }, timing, delay);
}
