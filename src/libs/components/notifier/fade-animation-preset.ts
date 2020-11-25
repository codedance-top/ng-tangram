import {
  NtNotifierAnimationPreset,
  NtNotifierAnimationPresetKeyframes
} from './notifier-animation-data';

/**
 * Fade animation preset
 */
export const fade: NtNotifierAnimationPreset = {
	hide: (): NtNotifierAnimationPresetKeyframes => {
		return {
			from: { opacity: '1', },
			to: { opacity: '0', },
		};
	},
	show: (): NtNotifierAnimationPresetKeyframes => {
		return {
			from: { opacity: '0', },
			to: { opacity: '1', },
		};
	},
};
