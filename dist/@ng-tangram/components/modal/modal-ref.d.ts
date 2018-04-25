import { OverlayRef } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { NtModalComponent } from './modal.component';
export declare class NtModalRef<T, R = any> {
    private _overlayRef;
    private _containerInstance;
    readonly id: string;
    componentInstance: T;
    closable: boolean | undefined;
    private _afterOpen;
    private _afterClosed;
    private _beforeClose;
    private _result;
    private _locationChanges;
    constructor(_overlayRef: OverlayRef, _containerInstance: NtModalComponent, location?: Location, id?: string);
    /**
     * Close the modal.
     * @param modalResult Optional result to return to the modal opener.
     */
    close(modalResult?: R): void;
    /**
     * Gets an observable that is notified when the modal is finished opening.
     */
    afterOpen(): Observable<void>;
    /**
     * Gets an observable that is notified when the modal is finished closing.
     */
    afterClosed(): Observable<R | undefined>;
    /**
     * Gets an observable that is notified when the modal has started closing.
     */
    beforeClose(): Observable<R | undefined>;
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    backdropClick(): Observable<MouseEvent>;
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    keydownEvents(): Observable<KeyboardEvent>;
    /**
     * Updates the modal's width and height.
     * @param width New width of the modal.
     * @param height New height of the modal.
     */
    updateSize(width?: string, height?: string): this;
    /** Fetches the position strategy object from the overlay ref. */
    private _getPositionStrategy();
}
