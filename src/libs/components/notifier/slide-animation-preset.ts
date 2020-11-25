import {
  NtNotifierAnimationPreset,
  NtNotifierAnimationPresetKeyframes
} from './notifier-animation-data';
import { NtNotifierConfig } from './notifier-config';
import { NtNotifierRef } from './notifier-ref';

/**
 * Slide animation preset
 */
export const slide: NtNotifierAnimationPreset = {

	hide: (notification: NtNotifierRef): NtNotifierAnimationPresetKeyframes => {
		// Prepare variables
		const config: NtNotifierConfig = notification.component.getConfig();
		const shift: number = notification.component.getShift();
		let from: {
			[animatablePropertyName: string]: string;
		};
		let to: {
			[animatablePropertyName: string]: string;
		};

		// Configure variables, depending on configuration and component
		if (config.position.horizontal.position === 'left') {
			from = {
				transform: `translate3d( 0, ${shift}px, 0 )`,
			};
			to = {
				transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), ${shift}px, 0 )`,
			};
		} else if (config.position.horizontal.position === 'right') {
			from = {
				transform: `translate3d( 0, ${shift}px, 0 )`,
			};
			to = {
				transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), ${shift}px, 0 )`,
			};
		} else {
			let horizontalPosition: string;
			if (config.position.vertical.position === 'top') {
				horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
			} else {
				horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
			}
			from = {
				transform: `translate3d( -50%, ${shift}px, 0 )`,
			};
			to = {
				transform: `translate3d( -50%, ${horizontalPosition}, 0 )`,
			};
		}

		// Done
		return {
			from,
			to,
		};
  },

	show: (notification: NtNotifierRef): NtNotifierAnimationPresetKeyframes => {
		// Prepare variables
		const config: NtNotifierConfig = notification.component.getConfig();
		let from: {
			[animatablePropertyName: string]: string;
		};
		let to: {
			[animatablePropertyName: string]: string;
		};

		// Configure variables, depending on configuration and component
		if (config.position.horizontal.position === 'left') {
			from = {
				transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), 0, 0 )`,
			};
			to = {
				transform: 'translate3d( 0, 0, 0 )',
			};
		} else if (config.position.horizontal.position === 'right') {
			from = {
				transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), 0, 0 )`,
			};
			to = {
				transform: 'translate3d( 0, 0, 0 )',
			};
		} else {
			let horizontalPosition: string;
			if (config.position.vertical.position === 'top') {
				horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
			} else {
				horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
			}
			from = {
				transform: `translate3d( -50%, ${horizontalPosition}, 0 )`,
			};
			to = {
				transform: 'translate3d( -50%, 0, 0 )',
			};
		}

		// Done
		return {
			from,
			to,
		};
	},
};
