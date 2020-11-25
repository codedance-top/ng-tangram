import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { NtNotifierAnimation } from './notifier-animation';
import { NtNotifierAnimationData } from './notifier-animation-data';
import { NtNotifierConfig } from './notifier-config';
import { DEFAULT_NOTIFIER_ICONS, NT_NOTIFIER_ICONS, NtNotifierIcons } from './notifier-icons';
import { NtNotifierRef } from './notifier-ref';
import { NtNotifierTimer } from './notifier-timer';
import { NtNotifier } from './notifier.service';

const TYPE_COLORS_MAP = {
  default: 'secondary',
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'alert',
};

/**
 * Notifier notification component
 * -------------------------------
 * This component is responsible for actually displaying the notification on screen. In addition, it's able to show and hide this
 * notification, in particular to animate this notification in and out, as well as shift (move) this notification vertically around.
 * Furthermore, the notification component handles all interactions the user has with this notification / component, such as clicks and
 * mouse movements.
 */
@Component({
  selector: 'nt-notifier',
  templateUrl: 'notifier.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush, // (#perfmatters)
  providers: [NtNotifierTimer],
	host: {
    'class': 'nt-notifier',
		'(click)': 'onNotificationClick()',
		'(mouseout)': 'onNotificationMouseout()',
		'(mouseover)': 'onNotificationMouseover()'
	}
})
export class NtNotifierComponent implements AfterViewInit {
	/**
	 * Input: Notification object, contains all details necessary to construct the notification
	 */
	@Input() notification: NtNotifierRef;

	/**
	 * Output: Ready event, handles the initialization success by emitting a reference to this notification component
	 */
	@Output() ready: EventEmitter<NtNotifierComponent> = new EventEmitter<NtNotifierComponent>();

	/**
	 * Output: Dismiss event, handles the click on the dismiss button by emitting the notification ID of this notification component
	 */
	@Output() dismiss: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Notifier configuration
	 */
	readonly config: NtNotifierConfig;

	/**
	 * Native element reference, used for manipulating DOM properties
	 */
	private readonly _element: HTMLElement;

	/**
	 * Current notification height, calculated and cached here (#perfmatters)
	 */
	private _elementHeight: number;

	/**
	 * Current notification width, calculated and cached here (#perfmatters)
	 */
	private _elementWidth: number;

	/**
	 * Current notification shift, calculated and cached here (#perfmatters)
	 */
  private _elementShift: number = 0;

  get _hasIcon() { return this.notification.type !== 'default'; }

	constructor(
    elementRef: ElementRef,
    notifier: NtNotifier,
		private renderer: Renderer2,
		private _notifierTimer: NtNotifierTimer,
    private _notifierAnimation: NtNotifierAnimation,
    @Optional() @Inject(NT_NOTIFIER_ICONS) public icons: NtNotifierIcons
	) {
		this.config = notifier.getConfig();
		this._element = elementRef.nativeElement;
    this.icons = { ...DEFAULT_NOTIFIER_ICONS, ...icons };
	}

	/**
	 * Component after view init lifecycle hook, setts up the component and then emits the ready event
	 */
	ngAfterViewInit(): void {
		this._setup();
		this._elementHeight = this._element.offsetHeight;
		this._elementWidth = this._element.offsetWidth;
		this.ready.emit(this);
	}

	/**
	 * Get the notifier config
	 *
	 * @returns Notifier configuration
	 */
	getConfig(): NtNotifierConfig {
		return this.config;
	}

	/**
	 * Get notification element height (in px)
	 *
	 * @returns Notification element height (in px)
	 */
	getHeight(): number {
		return this._elementHeight;
	}

	/**
	 * Get notification element width (in px)
	 *
	 * @returns Notification element height (in px)
	 */
	getWidth(): number {
		return this._elementWidth;
	}

	/**
	 * Get notification shift offset (in px)
	 *
	 * @returns Notification element shift offset (in px)
	 */
	getShift(): number {
		return this._elementShift;
	}

	/**
	 * Show (animate in) this notification
	 *
	 * @returns Promise, resolved when done
	 */
	show(): Promise<undefined> {
		return new Promise<undefined>((resolve: () => void, reject: () => void) => {
			// Are animations enabled?
			if (this.config.animations.enabled && this.config.animations.show.speed > 0) {
				// Get animation data
        const animationData: NtNotifierAnimationData =
          this._notifierAnimation.getAnimationData('show', this.notification);

				// Set initial styles (styles before animation), prevents quick flicker when animation starts
				const animatedProperties: Array<string> = Object.keys(
					animationData.keyframes[0]
				);
				for (let i: number = animatedProperties.length - 1; i >= 0; i--) {
					this.renderer.setStyle(
						this._element,
						animatedProperties[i],
						animationData.keyframes[0][animatedProperties[i]]
					);
				}

				// Animate notification in
				this.renderer.setStyle(this._element, 'visibility', 'visible');
				const animation: Animation = this._element.animate(
					animationData.keyframes,
					animationData.options
				);
				animation.onfinish = () => {
					this._startHideTimer();
					resolve(); // Done
				};
			} else {
				// Show notification
				this.renderer.setStyle(this._element, 'visibility', 'visible');
				this._startHideTimer();
				resolve(); // Done
			}
		});
	}

	/**
	 * Hide (animate out) this notification
	 *
	 * @returns Promise, resolved when done
	 */
	hide(): Promise<undefined> {
		return new Promise<undefined>((resolve: () => void, reject: () => void) => {
			this._stopHideTimer();

			// Are animations enabled?
			if (
				this.config.animations.enabled &&
				this.config.animations.hide.speed > 0
			) {
        const animationData: NtNotifierAnimationData =
          this._notifierAnimation.getAnimationData('hide', this.notification);
				const animation: Animation = this._element.animate(
					animationData.keyframes,
					animationData.options
				);
				animation.onfinish = () => {
					resolve(); // Done
				};
			} else {
				resolve(); // Done
			}
		});
	}

	/**
	 * Shift (move) this notification
	 *
	 * @param   distance         Distance to shift (in px)
	 * @param   shiftToMakePlace Flag, defining in which direction to shift
	 * @returns Promise, resolved when done
	 */
	shift(distance: number, shiftToMakePlace: boolean): Promise<undefined> {
		return new Promise<undefined>((resolve: () => void, reject: () => void) => {
			// Calculate new position (position after the shift)
			let newElementShift: number;
			if (
				(this.config.position.vertical.position === 'top' &&
					shiftToMakePlace) ||
				(this.config.position.vertical.position === 'bottom' &&
					!shiftToMakePlace)
			) {
				newElementShift =
					this._elementShift + distance + this.config.position.vertical.gap;
			} else {
				newElementShift =
					this._elementShift - distance - this.config.position.vertical.gap;
			}
			const horizontalPosition: string =
				this.config.position.horizontal.position === 'middle' ? '-50%' : '0';

			// Are animations enabled?
			if (
				this.config.animations.enabled &&
				this.config.animations.shift.speed > 0
			) {
				const animationData: NtNotifierAnimationData = {
					// TODO: Extract into animation service
					keyframes: [
						{
							transform: `translate3d( ${horizontalPosition}, ${this._elementShift}px, 0 )`,
						},
						{
							transform: `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`,
						},
					],
					options: {
						duration: this.config.animations.shift.speed,
						easing: this.config.animations.shift.easing,
						fill: 'forwards',
					},
				};
				this._elementShift = newElementShift;
				const animation: Animation = this._element.animate(
					animationData.keyframes,
					animationData.options
				);
				animation.onfinish = () => {
					resolve(); // Done
				};
			} else {
				this.renderer.setStyle(
					this._element,
					'transform',
					`translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`
				);
				this._elementShift = newElementShift;
				resolve(); // Done
			}
		});
	}

	/**
	 * Handle click on dismiss button
	 */
	onClickDismiss() {
		this.dismiss.emit(this.notification.id);
	}

	/**
	 * Handle mouseover over notification area
	 */
	onNotificationMouseover(): void {
		if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
			this._pauseHideTimer();
		} else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
			this._stopHideTimer();
		}
	}

	/**
	 * Handle mouseout from notification area
	 */
	onNotificationMouseout(): void {
		if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
			this._continueHideTimer();
		} else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
			this._startHideTimer();
		}
	}

	/**
	 * Handle click on notification area
	 */
	onNotificationClick(): void {
		if (this.config.behaviour.onClick === 'hide') {
			this.onClickDismiss();
		}
	}

	/**
	 * Start the auto hide timer (if enabled)
	 */
	private _startHideTimer(): void {
		if (this._getAutoHideable()) {
			this._notifierTimer.start(this._getHiddenTime()).then(() => {
				this.onClickDismiss();
			});
		}
	}

	/**
	 * Pause the auto hide timer (if enabled)
	 */
	private _pauseHideTimer(): void {
		if (this._getAutoHideable()) {
			this._notifierTimer.pause();
		}
	}

	/**
	 * Continue the auto hide timer (if enabled)
	 */
	private _continueHideTimer(): void {
		if (this._getAutoHideable()) {
			this._notifierTimer.continue();
		}
	}

	/**
	 * Stop the auto hide timer (if enabled)
	 */
	private _stopHideTimer(): void {
		if (this._getAutoHideable()) {
			this._notifierTimer.stop();
		}
  }

  private _getAutoHideable(): boolean {
    return this.config.behaviour.hiddenStrategy === 'content' ||
      this.config.behaviour.hiddenStrategy === 'absoluted';
  }

  private _getHiddenTime(): number {
    let time = Math.max(this.config.behaviour?.hiddenTime || 0, 0);
    if (this.config.behaviour.hiddenStrategy === 'content') {
      time += (this.notification.message || '').length * 100;
    }
    return time
  }

	/**
	 * Initial notification setup
	 */
	private _setup(): void {
		// Set start position (initially the exact same for every new notification)
		if (this.config.position.horizontal.position === 'left') {
			this.renderer.setStyle(
				this._element,
				'left',
				`${this.config.position.horizontal.distance}px`
			);
		} else if (this.config.position.horizontal.position === 'right') {
			this.renderer.setStyle(
				this._element,
				'right',
				`${this.config.position.horizontal.distance}px`
			);
		} else {
			this.renderer.setStyle(this._element, 'left', '50%');
			// Let's get the GPU handle some work as well (#perfmatters)
			this.renderer.setStyle(
				this._element,
				'transform',
				'translate3d( -50%, 0, 0 )'
			);
		}
		if (this.config.position.vertical.position === 'top') {
			this.renderer.setStyle(
				this._element,
				'top',
				`${this.config.position.vertical.distance}px`
			);
		} else {
			this.renderer.setStyle(
				this._element,
				'bottom',
				`${this.config.position.vertical.distance}px`
			);
		}

		// Add classes (responsible for visual design)
		this.renderer.addClass(this._element, TYPE_COLORS_MAP[this.notification.type]);
	}
}
