import { Optional } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs/Subscription';
import { NtModalContainer } from './modal-container';

import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';

// Counter for unique modal ids.
let uniqueId = 0;

export class NtModalRef<T, R = any> {

  componentInstance: T;

  closable: boolean | undefined = this._containerInstance.config.closable;

  private _afterOpen = new Subject<void>();
  private _afterClosed = new Subject<R | undefined>();
  private _beforeClose = new Subject<R | undefined>();
  private _result: R | undefined;
  private _locationChanges: ISubscription = Subscription.EMPTY;

  constructor(
    private _overlayRef: OverlayRef,
    private _containerInstance: NtModalContainer,
    location?: Location,
    readonly id: string = `nt-modal-${uniqueId++}`) {

    // Emit when opening animation completes
    _containerInstance.animationStateChanged
      .pipe(filter(event => event.phaseName === 'done' && event.toState === 'enter'), take(1))
      .subscribe(() => {
        this._afterOpen.next();
        this._afterOpen.complete();
      });

    // Dispose overlay when closing animation is complete
    _containerInstance.animationStateChanged
      .pipe(filter(event => event.phaseName === 'done' && event.toState === 'exit'), take(1))
      .subscribe(() => {
        this._overlayRef.dispose();
        this._locationChanges.unsubscribe();
        this._afterClosed.next(this._result);
        this._afterClosed.complete();
        this.componentInstance = null!;
      });

    _overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE && this.closable))
      .subscribe(() => this.close());

    if (location) {
      this._locationChanges = location.subscribe(() => this.close());
    }
  }

  /**
   * Close the modal.
   * @param modalResult Optional result to return to the modal opener.
   */
  close(modalResult?: R): void {
    this._result = modalResult;

    // Transition the backdrop in parallel to the modal.
    this._containerInstance.animationStateChanged
      .pipe(filter(event => event.phaseName === 'start'), take(1))
      .subscribe(() => {
        this._beforeClose.next(modalResult);
        this._beforeClose.complete();
        this._overlayRef.detachBackdrop();
      });

    this._containerInstance.exit();
  }

  /**
   * Gets an observable that is notified when the modal is finished opening.
   */
  afterOpen(): Observable<void> {
    return this._afterOpen.asObservable();
  }

  /**
   * Gets an observable that is notified when the modal is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  /**
   * Gets an observable that is notified when the modal has started closing.
   */
  beforeClose(): Observable<R | undefined> {
    return this._beforeClose.asObservable();
  }

  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /**
   * Updates the modal's width and height.
   * @param width New width of the modal.
   * @param height New height of the modal.
   */
  updateSize(width: string = 'auto', height: string = 'auto'): this {
    this._getPositionStrategy().width(width).height(height);
    this._overlayRef.updatePosition();
    return this;
  }

  /** Fetches the position strategy object from the overlay ref. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
  }
}
