import { Observable, Subject, Subscription, SubscriptionLike } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { ESCAPE } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { TemplateRef } from '@angular/core';

import { NtContextMenuComponent } from './contextmenu.component';

let uniqueId = 0;

// @dynamic
export class NtContextMenuRef {

  static currentRef: NtContextMenuRef;

  templateInstance: TemplateRef<any>;

  private _afterOpen = new Subject<void>();
  private _afterClosed = new Subject<undefined>();
  private _beforeClose = new Subject<undefined>();
  private _locationChanges: SubscriptionLike = Subscription.EMPTY;

  constructor(
    private _overlayRef: OverlayRef,
    private _containerInstance: NtContextMenuComponent,
    location?: Location,
    readonly id: string = `nt-contextmenu-${uniqueId++}`) {

    NtContextMenuRef.currentRef = this;

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
        this._afterClosed.next();
        this._afterClosed.complete();
        this.templateInstance = null!;
      });

    _overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close());

    if (location) {
      this._locationChanges = location.subscribe(() => this.close());
    }
  }

  /**
   * Close the menu.
   */
  close(): void {

    // Transition the backdrop in parallel to the menu.
    this._containerInstance.animationStateChanged
      .pipe(filter(event => event.phaseName === 'start'), take(1))
      .subscribe(() => {
        this._beforeClose.next();
        this._beforeClose.complete();
        this._overlayRef.detachBackdrop();
      });

    this._containerInstance.exit();
  }

  afterOpen(): Observable<void> {
    return this._afterOpen.asObservable();
  }

  afterClosed(): Observable<void> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<void> {
    return this._beforeClose.asObservable();
  }

  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /** Fetches the position strategy object from the overlay ref. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
  }
}
