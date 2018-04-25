import { Component, ViewEncapsulation, ViewChild, EventEmitter, ApplicationRef, ComponentFactoryResolver, Inject, Injectable, InjectionToken, Injector, Optional, TemplateRef, NgModule } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { trigger, transition } from '@angular/animations';
import { fadeInY, fadeOutY } from '@ng-tangram/animate/fading';
import { ESCAPE } from '@angular/cdk/keycodes';
import { filter, take } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Overlay, OverlayConfig, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Location, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class NtModalConfig {
    constructor() {
        // width?: string = '400px';
        // height?: string = '600px';
        this.top = '80px';
        this.maxWidth = '80vw';
        this.closable = true;
        this.data = {};
        this.panelClass = 'tm-file-preview-modal-panel';
        this.hasBackdrop = true;
        this.backdropClass = 'dark-backdrop';
        this.centerVertically = false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
function throwNtModalContentAlreadyAttachedError() {
    throw Error('Attempting to attach modal content after content is already attached');
}
class NtModalComponent extends BasePortalOutlet {
    constructor() {
        super();
        this.state = 'enter';
        this.animationStateChanged = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set config(value) { this._config = value; }
    /**
     * @return {?}
     */
    get config() { return this._config; }
    /**
     * @template T
     * @param {?} portal
     * @return {?}
     */
    attachComponentPortal(portal) {
        if (this._portalOutlet.hasAttached()) {
            throwNtModalContentAlreadyAttachedError();
        }
        return this._portalOutlet.attachComponentPortal(portal);
    }
    /**
     * @template C
     * @param {?} portal
     * @return {?}
     */
    attachTemplatePortal(portal) {
        if (this._portalOutlet.hasAttached()) {
            throwNtModalContentAlreadyAttachedError();
        }
        return this._portalOutlet.attachTemplatePortal(portal);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAnimationDone(event) {
        this.animationStateChanged.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAnimationStart(event) {
        this.animationStateChanged.emit(event);
    }
    /**
     * @return {?}
     */
    exit() {
        this.state = 'exit';
    }
}
NtModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-modal',
                template: `
    <ng-template cdkPortalOutlet></ng-template>
    <button *ngIf="config.closable" (click)="exit()" class="close-button" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
  `,
                encapsulation: ViewEncapsulation.None,
                animations: [
                    trigger('fade', [
                        transition('void => *', fadeInY({ a: '-10%', b: 0 }, .2)),
                        transition('* => exit', fadeOutY({ a: 0, b: '-10%' }, .2))
                    ])
                ],
                host: {
                    'class': 'reveal',
                    '[@fade]': 'state',
                    '(@fade.start)': 'onAnimationStart($event)',
                    '(@fade.done)': 'onAnimationDone($event)',
                }
            },] },
];
/** @nocollapse */
NtModalComponent.ctorParameters = () => [];
NtModalComponent.propDecorators = {
    "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Counter for unique modal ids.
let /** @type {?} */ uniqueId = 0;
/**
 * @template T, R
 */
class NtModalRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     * @param {?=} location
     * @param {?=} id
     */
    constructor(_overlayRef, _containerInstance, location, id = `nt-modal-${uniqueId++}`) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        this.closable = this._containerInstance.config.closable;
        this._afterOpen = new Subject();
        this._afterClosed = new Subject();
        this._beforeClose = new Subject();
        this._locationChanges = Subscription.EMPTY;
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
            this.componentInstance = /** @type {?} */ ((null));
        });
        _overlayRef.keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && !!this.closable))
            .subscribe(() => this.close());
        if (location) {
            this._locationChanges = location.subscribe(() => this.close());
        }
    }
    /**
     * Close the modal.
     * @param {?=} modalResult Optional result to return to the modal opener.
     * @return {?}
     */
    close(modalResult) {
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
     * @return {?}
     */
    afterOpen() {
        return this._afterOpen.asObservable();
    }
    /**
     * Gets an observable that is notified when the modal is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Gets an observable that is notified when the modal has started closing.
     * @return {?}
     */
    beforeClose() {
        return this._beforeClose.asObservable();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this._overlayRef.keydownEvents();
    }
    /**
     * Updates the modal's width and height.
     * @param {?=} width New width of the modal.
     * @param {?=} height New height of the modal.
     * @return {?}
     */
    updateSize(width = 'auto', height = 'auto') {
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    _getPositionStrategy() {
        return /** @type {?} */ (this._overlayRef.getConfig().positionStrategy);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ NT_MODAL_DATA = new InjectionToken('nt-modal-data');
const /** @type {?} */ NT_MODAL_DEFAULT_CONFIG = new InjectionToken('nt-model-default-config');
class NtModal {
    /**
     * @param {?} _location
     * @param {?} _defaultConfig
     * @param {?} _overlay
     * @param {?} _injector
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _applicationRef
     */
    constructor(_location, _defaultConfig, _overlay, _injector, _overlayContainer, _componentFactoryResolver, _applicationRef) {
        this._location = _location;
        this._defaultConfig = _defaultConfig;
        this._overlay = _overlay;
        this._injector = _injector;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._applicationRef = _applicationRef;
        this._openModalsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new Subject();
        this._afterOpenAtThisLevel = new Subject();
    }
    /**
     * @template T
     * @param {?} content
     * @param {?=} config
     * @return {?}
     */
    open(content, config = {}) {
        config = Object.assign({}, this._defaultConfig || new NtModalConfig(), config);
        const /** @type {?} */ overlayRef = this._createOverlay(config);
        const /** @type {?} */ modalContainerRef = this._attachModalContainer(overlayRef, config);
        const /** @type {?} */ modalRef = this._attachModalContent(content, modalContainerRef, overlayRef, config);
        this._openModalsAtThisLevel.push(modalRef);
        modalRef.afterClosed().subscribe(() => this._removeOpenModal(modalRef));
        this._afterOpenAtThisLevel.next(modalRef);
        return modalRef;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    _createOverlay(config) {
        const /** @type {?} */ overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    /**
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    _attachModalContainer(overlayRef, config) {
        const /** @type {?} */ containerPortal = new ComponentPortal(NtModalComponent, null);
        const /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.config = config;
        return containerRef.instance;
    }
    /**
     * @template T
     * @param {?} content
     * @param {?} modalContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    _attachModalContent(content, modalContainer, overlayRef, config) {
        const /** @type {?} */ modalRef = new NtModalRef(overlayRef, modalContainer, this._location, config.id);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                // if (modalRef.closable) {
                modalRef.close();
                // }
            });
        }
        if (content instanceof TemplateRef) {
            modalContainer.attachTemplatePortal(new TemplatePortal(content, /** @type {?} */ ((null)), /** @type {?} */ ({ $implicit: config.data, modalRef })));
        }
        else {
            const /** @type {?} */ injector = this._createInjector(config, modalRef, modalContainer);
            const /** @type {?} */ contentRef = modalContainer.attachComponentPortal(new ComponentPortal(content, undefined, injector));
            modalRef.componentInstance = contentRef.instance;
        }
        return modalRef;
    }
    /**
     * Removes a modal from the array of open modals.
     * @param {?} modalRef modal to be removed.
     * @return {?}
     */
    _removeOpenModal(modalRef) {
        const /** @type {?} */ index = this._openModalsAtThisLevel.indexOf(modalRef);
        if (index > -1) {
            this._openModalsAtThisLevel.splice(index, 1);
            if (!this._openModalsAtThisLevel.length) {
                this._afterAllClosedAtThisLevel.next();
            }
        }
    }
    /**
     * @template T
     * @param {?} config
     * @param {?} modalRef
     * @param {?} modalContainer
     * @return {?}
     */
    _createInjector(config, modalRef, modalContainer) {
        const /** @type {?} */ injectionTokens = new WeakMap();
        injectionTokens.set(NtModalRef, modalRef);
        injectionTokens.set(NtModalComponent, modalContainer);
        injectionTokens.set(NT_MODAL_DATA, config.data);
        return new PortalInjector(this._injector, injectionTokens);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    _getOverlayConfig(config) {
        const /** @type {?} */ positionStrategy = this._overlay.position()
            .global()
            .centerHorizontally();
        const /** @type {?} */ overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this._overlay.scrollStrategies.block(),
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            positionStrategy: config.centerVertically
                ? positionStrategy.centerVertically()
                : positionStrategy.top(config.top)
        });
        return overlayConfig;
    }
}
NtModal.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NtModal.ctorParameters = () => [
    { type: Location, decorators: [{ type: Optional },] },
    { type: NtModalConfig, decorators: [{ type: Optional }, { type: Inject, args: [NT_MODAL_DEFAULT_CONFIG,] },] },
    { type: Overlay, },
    { type: Injector, },
    { type: OverlayContainer, },
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtModalHeaderComponent {
}
NtModalHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-modal-header',
                template: `<ng-content></ng-content>`,
                host: {
                    class: 'nt-modal-header'
                }
            },] },
];
/** @nocollapse */
NtModalHeaderComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtModalBodyComponent {
}
NtModalBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-modal-body',
                template: `<ng-content></ng-content>`,
                host: {
                    class: 'nt-modal-body'
                }
            },] },
];
/** @nocollapse */
NtModalBodyComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtModalFooterComponent {
}
NtModalFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-modal-footer',
                template: `<ng-content></ng-content>`,
                host: {
                    class: 'nt-modal-footer'
                }
            },] },
];
/** @nocollapse */
NtModalFooterComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtModalModule {
}
NtModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PortalModule, OverlayModule],
                entryComponents: [NtModalComponent],
                declarations: [NtModalComponent, NtModalHeaderComponent, NtModalBodyComponent, NtModalFooterComponent],
                providers: [NtModal],
                exports: [NtModalHeaderComponent, NtModalBodyComponent, NtModalFooterComponent]
            },] },
];
/** @nocollapse */
NtModalModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtModalModule, NT_MODAL_DATA, NT_MODAL_DEFAULT_CONFIG, NtModal, NtModalRef, NtModalConfig, NtModalHeaderComponent, NtModalBodyComponent, NtModalFooterComponent, NtModalComponent as ɵa };
//# sourceMappingURL=modal.js.map
