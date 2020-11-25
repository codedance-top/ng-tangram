import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

import { NtNotifierAction } from './notifier-action';

/**
 * Notifier queue service
 *
 * In general, API calls don't get processed right away. Instead, we have to queue them up in order to prevent simultanious API calls
 * interfering with each other. This, at least in theory, is possible at any time. In particular, animations - which potentially overlap -
 * can cause changes in JS classes as well as affect the DOM. Therefore, the queue service takes all actions, puts them in a queue, and
 * processes them at the right time (which is when the previous action has been processed successfully).
 *
 * Technical sidenote:
 * An action looks pretty similar to the ones within the Flux / Redux pattern.
 */
@Injectable()
export class NtNotifierQueue {
	/**
	 * Stream of actions, subscribable from outside
	 */
	readonly actionStream: Subject<NtNotifierAction> = new Subject<NtNotifierAction>();

	/**
	 * Queue of actions
	 */
	private _actionQueue: Array<NtNotifierAction> = [];

	/**
	 * Flag, true if some action is currently in progress
	 */
	private _isActionInProgress: boolean = false;

	/**
	 * Push a new action to the queue, and try to run it
	 *
	 * @param action Action object
	 */
	push(action: NtNotifierAction): void {
		this._actionQueue.push(action);
		this._tryToRunNextAction();
	}

	/**
	 * Continue with the next action (called when the current action is finished)
	 */
	continue(): void {
		this._isActionInProgress = false;
		this._tryToRunNextAction();
	}

	/**
	 * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
	 */
	private _tryToRunNextAction(): void {
		if (this._isActionInProgress || this._actionQueue.length === 0) {
			return; // Skip (the queue can now go drink a coffee as it has nothing to do anymore)
    }
		this._isActionInProgress = true;
		this.actionStream.next(this._actionQueue.shift()); // Push next action to the stream, and remove the current action from the queue
	}
}
