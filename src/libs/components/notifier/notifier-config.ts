/**
 * Notifier options
 */
export interface NtNotifierOptions {
	animations?: {
		enabled?: boolean;
		hide?: {
			easing?: string;
			offset?: number | false;
			preset?: string;
			speed?: number;
		};
		overlap?: number | false;
		shift?: {
			easing?: string;
			speed?: number;
		};
		show?: {
			easing?: string;
			preset?: string;
			speed?: number;
		};
	};
	behaviour?: {
    hiddenStrategy?: 'never' | 'content' | 'absoluted';
    hiddenTime?: number;
		onClick?: 'hide' | false;
		onMouseover?: 'pauseAutoHide' | 'resetAutoHide' | false;
		showDismissButton?: boolean;
		stacking?: number | false;
	};
	position?: {
		horizontal?: {
			distance?: number;
			position?: 'left' | 'middle' | 'right';
		};
		vertical?: {
			distance?: number;
			gap?: number;
			position?: 'top' | 'bottom';
		};
	};
	theme?: string;
}

/**
 * Notifier configuration
 *
 * The notifier configuration defines what notifications look like, how they behave, and how they get animated. It is a global
 * configuration, which means that it only can be set once (at the beginning), and cannot be changed afterwards. Aligning to the world of
 * Angular, this configuration can be provided in the root app module - alternatively, a meaningful default configuration will be used.
 */
export class NtNotifierConfig implements NtNotifierOptions {
	/**
	 * Customize animations
	 */
	animations: {
		enabled: boolean;
		hide: {
			easing: string;
			offset: number | false;
			preset: string;
			speed: number;
		};
		overlap: number | false;
		shift: {
			easing: string;
			speed: number;
		};
		show: {
			easing: string;
			preset: string;
			speed: number;
		};
	};

	/**
	 * Customize behaviour
	 */
	behaviour: {
    hiddenStrategy: 'never' | 'content' | 'absoluted';
    hiddenTime?: number;
		onClick: 'hide' | false;
		onMouseover: 'pauseAutoHide' | 'resetAutoHide' | false;
		showDismissButton: boolean;
		stacking: number | false;
	};

	/**
	 * Customize positioning
	 */
	position: {
		horizontal: {
			distance: number;
			position: 'left' | 'middle' | 'right';
		};
		vertical: {
			distance: number;
			gap: number;
			position: 'top' | 'bottom';
		};
	};

	/**
	 * Constructor
	 *
	 * @param [customOptions={}] Custom notifier options, optional
	 */
	constructor(customOptions: NtNotifierOptions = {}) {
		// Set default values
		this.animations = {
			enabled: true,
			hide: {
				easing: 'ease',
				offset: 50,
				preset: 'fade',
				speed: 300,
			},
			overlap: 150,
			shift: {
				easing: 'ease',
				speed: 300,
			},
			show: {
				easing: 'ease',
				preset: 'slide',
				speed: 300,
			},
		};
		this.behaviour = {
      hiddenStrategy: 'content',
      hiddenTime: 2000,
			onClick: false,
			onMouseover: 'pauseAutoHide',
			showDismissButton: true,
			stacking: 4,
		};
		this.position = {
			horizontal: {
				distance: 12,
				position: 'middle',
			},
			vertical: {
				distance: 12,
				gap: 10,
				position: 'top',
			},
		};

		if (customOptions.animations !== undefined) {
			if (customOptions.animations.enabled !== undefined) {
				this.animations.enabled = customOptions.animations.enabled;
			}
			if (customOptions.animations.overlap !== undefined) {
				this.animations.overlap = customOptions.animations.overlap;
			}
			if (customOptions.animations.hide !== undefined) {
				Object.assign(this.animations.hide, customOptions.animations.hide);
			}
			if (customOptions.animations.shift !== undefined) {
				Object.assign(this.animations.shift, customOptions.animations.shift);
			}
			if (customOptions.animations.show !== undefined) {
				Object.assign(this.animations.show, customOptions.animations.show);
			}
		}
		if (customOptions.behaviour !== undefined) {
			Object.assign(this.behaviour, customOptions.behaviour);
		}
		if (customOptions.position !== undefined) {
			if (customOptions.position.horizontal !== undefined) {
				Object.assign(
					this.position.horizontal,
					customOptions.position.horizontal
				);
			}
			if (customOptions.position.vertical !== undefined) {
				Object.assign(this.position.vertical, customOptions.position.vertical);
			}
		}
	}
}
