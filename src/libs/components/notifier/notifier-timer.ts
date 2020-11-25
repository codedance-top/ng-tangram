import { Injectable } from '@angular/core';

/**
 * Notifier timer service
 *
 * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
 * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
 */
@Injectable()
export class NtNotifierTimer {
	/**
	 * Timestamp (in ms), created in the moment the timer starts
	 */
	private _now: number = 0;

	/**
	 * Remaining time (in ms)
	 */
	private _remaining: number = 0;

	/**
	 * Timeout ID, used for clearing the timeout later on
	 */
	private _timerId: number;

	/**
	 * Promise resolve function, eventually getting called once the timer finishes
	 */
	private _finishPromiseResolver: () => void;

	/**
	 * Start (or resume) the timer
	 *
	 * @param   duration Timer duration, in ms
	 * @returns          Promise, resolved once the timer finishes
	 */
	start(duration: number): Promise<undefined> {
		return new Promise<undefined>((resolve: () => void, reject: () => void) => {
			// For the first run ...
			this._remaining = duration;

			// Setup, then start the timer
			this._finishPromiseResolver = resolve;
			this.continue();
		});
	}

	/**
	 * Pause the timer
	 */
	pause(): void {
		clearTimeout(this._timerId);
		this._remaining -= new Date().getTime() - this._now;
	}

	/**
	 * Continue the timer
	 */
	continue(): void {
		this._now = new Date().getTime();
		this._timerId = window.setTimeout(() => {
			this._finish();
		}, this._remaining);
	}

	/**
	 * Stop the timer
	 */
	stop(): void {
		clearTimeout(this._timerId);
		this._remaining = 0;
	}

	/**
	 * Finish up the timeout by resolving the timer promise
	 */
	private _finish(): void {
		this._finishPromiseResolver();
	}
}
