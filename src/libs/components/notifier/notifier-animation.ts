import { Injectable } from '@angular/core';

import { fade } from './fade-animation-preset';
import { slide } from './slide-animation-preset';
import {
  NtNotifierAnimationData,
  NtNotifierAnimationPreset,
  NtNotifierAnimationPresetKeyframes
} from './notifier-animation-data';
import { NtNotifierRef } from './notifier-ref';

export type AnimationPresetsMap = { [animationPresetName: string]: NtNotifierAnimationPreset };

/**
 * Notifier animation service
 */
@Injectable()
export class NtNotifierAnimation {

	/**
	 * List of animation presets (currently static)
	 */
	private readonly _animationPresets: AnimationPresetsMap = { fade, slide };

	/**
	 * Get animation data
	 *
	 * This method generates all data the Web Animations API needs to animate our notification. The result depends on both the animation
	 * direction (either in or out) as well as the notifications (and its attributes) itself.
	 *
	 * @param   direction    Animation direction, either in or out
	 * @param   notification Notification the animation data should be generated for
	 * @returns Animation information
	 */
	getAnimationData( direction: 'show' | 'hide', notification: NtNotifierRef ): NtNotifierAnimationData {

		// Get all necessary animation data
		let keyframes: NtNotifierAnimationPresetKeyframes;
		let duration: number;
		let easing: string;
		if ( direction === 'show' ) {
			keyframes = this._animationPresets[ notification.component.getConfig().animations.show.preset ].show( notification );
			duration = notification.component.getConfig().animations.show.speed;
			easing = notification.component.getConfig().animations.show.easing;
		} else {
			keyframes = this._animationPresets[ notification.component.getConfig().animations.hide.preset ].hide( notification );
			duration = notification.component.getConfig().animations.hide.speed;
			easing = notification.component.getConfig().animations.hide.easing;
		}

		// Build and return animation data
		return {
			keyframes: [
				keyframes.from,
				keyframes.to
			],
			options: {
				duration,
				easing,
				fill: 'forwards' // Keep the newly painted state after the animation finished
			}
		};
	}
}
