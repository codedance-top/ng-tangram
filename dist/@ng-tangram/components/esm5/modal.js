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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
NtModalConfig = /** @class */ (function () {
    function NtModalConfig() {
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
    return NtModalConfig;
}());

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
var NtModalComponent = /** @class */ (function (_super) {
    __extends(NtModalComponent, _super);
    function NtModalComponent() {
        var _this = _super.call(this) || this;
        _this.state = 'enter';
        _this.animationStateChanged = new EventEmitter();
        return _this;
    }
    Object.defineProperty(NtModalComponent.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () { return this._config; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._config = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} portal
     * @return {?}
     */
    NtModalComponent.prototype.attachComponentPortal = /**
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throwNtModalContentAlreadyAttachedError();
        }
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /**
     * @template C
     * @param {?} portal
     * @return {?}
     */
    NtModalComponent.prototype.attachTemplatePortal = /**
     * @template C
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throwNtModalContentAlreadyAttachedError();
        }
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NtModalComponent.prototype.onAnimationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.animationStateChanged.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NtModalComponent.prototype.onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.animationStateChanged.emit(event);
    };
    /**
     * @return {?}
     */
    NtModalComponent.prototype.exit = /**
     * @return {?}
     */
    function () {
        this.state = 'exit';
    };
    NtModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-modal',
                    template: "\n    <ng-template cdkPortalOutlet></ng-template>\n    <button *ngIf=\"config.closable\" (click)=\"exit()\" class=\"close-button\" type=\"button\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  ",
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
    NtModalComponent.ctorParameters = function () { return []; };
    NtModalComponent.propDecorators = {
        "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
    };
    return NtModalComponent;
}(BasePortalOutlet));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Counter for unique modal ids.
var /** @type {?} */ uniqueId = 0;
/**
 * @template T, R
 */
var  /**
 * @template T, R
 */
NtModalRef = /** @class */ (function () {
    function NtModalRef(_overlayRef, _containerInstance, location, id) {
        if (id === void 0) { id = "nt-modal-" + uniqueId++; }
        var _this = this;
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
            .pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'enter'; }), take(1))
            .subscribe(function () {
            _this._afterOpen.next();
            _this._afterOpen.complete();
        });
        // Dispose overlay when closing animation is complete
        _containerInstance.animationStateChanged
            .pipe(filter(function (event) { return event.phaseName === 'done' && event.toState === 'exit'; }), take(1))
            .subscribe(function () {
            _this._overlayRef.dispose();
            _this._locationChanges.unsubscribe();
            _this._afterClosed.next(_this._result);
            _this._afterClosed.complete();
            _this.componentInstance = /** @type {?} */ ((null));
        });
        _overlayRef.keydownEvents()
            .pipe(filter(function (event) { return event.keyCode === ESCAPE && !!_this.closable; }))
            .subscribe(function () { return _this.close(); });
        if (location) {
            this._locationChanges = location.subscribe(function () { return _this.close(); });
        }
    }
    /**
     * Close the modal.
     * @param modalResult Optional result to return to the modal opener.
     */
    /**
     * Close the modal.
     * @param {?=} modalResult Optional result to return to the modal opener.
     * @return {?}
     */
    NtModalRef.prototype.close = /**
     * Close the modal.
     * @param {?=} modalResult Optional result to return to the modal opener.
     * @return {?}
     */
    function (modalResult) {
        var _this = this;
        this._result = modalResult;
        // Transition the backdrop in parallel to the modal.
        this._containerInstance.animationStateChanged
            .pipe(filter(function (event) { return event.phaseName === 'start'; }), take(1))
            .subscribe(function () {
            _this._beforeClose.next(modalResult);
            _this._beforeClose.complete();
            _this._overlayRef.detachBackdrop();
        });
        this._containerInstance.exit();
    };
    /**
     * Gets an observable that is notified when the modal is finished opening.
     */
    /**
     * Gets an observable that is notified when the modal is finished opening.
     * @return {?}
     */
    NtModalRef.prototype.afterOpen = /**
     * Gets an observable that is notified when the modal is finished opening.
     * @return {?}
     */
    function () {
        return this._afterOpen.asObservable();
    };
    /**
     * Gets an observable that is notified when the modal is finished closing.
     */
    /**
     * Gets an observable that is notified when the modal is finished closing.
     * @return {?}
     */
    NtModalRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the modal is finished closing.
     * @return {?}
     */
    function () {
        return this._afterClosed.asObservable();
    };
    /**
     * Gets an observable that is notified when the modal has started closing.
     */
    /**
     * Gets an observable that is notified when the modal has started closing.
     * @return {?}
     */
    NtModalRef.prototype.beforeClose = /**
     * Gets an observable that is notified when the modal has started closing.
     * @return {?}
     */
    function () {
        return this._beforeClose.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    NtModalRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    NtModalRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this._overlayRef.keydownEvents();
    };
    /**
     * Updates the modal's width and height.
     * @param width New width of the modal.
     * @param height New height of the modal.
     */
    /**
     * Updates the modal's width and height.
     * @param {?=} width New width of the modal.
     * @param {?=} height New height of the modal.
     * @return {?}
     */
    NtModalRef.prototype.updateSize = /**
     * Updates the modal's width and height.
     * @param {?=} width New width of the modal.
     * @param {?=} height New height of the modal.
     * @return {?}
     */
    function (width, height) {
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    };
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    NtModalRef.prototype._getPositionStrategy = /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    function () {
        return /** @type {?} */ (this._overlayRef.getConfig().positionStrategy);
    };
    return NtModalRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ NT_MODAL_DATA = new InjectionToken('nt-modal-data');
var /** @type {?} */ NT_MODAL_DEFAULT_CONFIG = new InjectionToken('nt-model-default-config');
var NtModal = /** @class */ (function () {
    function NtModal(_location, _defaultConfig, _overlay, _injector, _overlayContainer, _componentFactoryResolver, _applicationRef) {
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
    NtModal.prototype.open = /**
     * @template T
     * @param {?} content
     * @param {?=} config
     * @return {?}
     */
    function (content, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        config = __assign({}, this._defaultConfig || new NtModalConfig(), config);
        var /** @type {?} */ overlayRef = this._createOverlay(config);
        var /** @type {?} */ modalContainerRef = this._attachModalContainer(overlayRef, config);
        var /** @type {?} */ modalRef = this._attachModalContent(content, modalContainerRef, overlayRef, config);
        this._openModalsAtThisLevel.push(modalRef);
        modalRef.afterClosed().subscribe(function () { return _this._removeOpenModal(modalRef); });
        this._afterOpenAtThisLevel.next(modalRef);
        return modalRef;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NtModal.prototype._createOverlay = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    };
    /**
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    NtModal.prototype._attachModalContainer = /**
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        var /** @type {?} */ containerPortal = new ComponentPortal(NtModalComponent, null);
        var /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.config = config;
        return containerRef.instance;
    };
    /**
     * @template T
     * @param {?} content
     * @param {?} modalContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    NtModal.prototype._attachModalContent = /**
     * @template T
     * @param {?} content
     * @param {?} modalContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (content, modalContainer, overlayRef, config) {
        var /** @type {?} */ modalRef = new NtModalRef(overlayRef, modalContainer, this._location, config.id);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(function () {
                // if (modalRef.closable) {
                modalRef.close();
                // }
            });
        }
        if (content instanceof TemplateRef) {
            modalContainer.attachTemplatePortal(new TemplatePortal(content, /** @type {?} */ ((null)), /** @type {?} */ ({ $implicit: config.data, modalRef: modalRef })));
        }
        else {
            var /** @type {?} */ injector = this._createInjector(config, modalRef, modalContainer);
            var /** @type {?} */ contentRef = modalContainer.attachComponentPortal(new ComponentPortal(content, undefined, injector));
            modalRef.componentInstance = contentRef.instance;
        }
        return modalRef;
    };
    /**
     * Removes a modal from the array of open modals.
     * @param {?} modalRef modal to be removed.
     * @return {?}
     */
    NtModal.prototype._removeOpenModal = /**
     * Removes a modal from the array of open modals.
     * @param {?} modalRef modal to be removed.
     * @return {?}
     */
    function (modalRef) {
        var /** @type {?} */ index = this._openModalsAtThisLevel.indexOf(modalRef);
        if (index > -1) {
            this._openModalsAtThisLevel.splice(index, 1);
            if (!this._openModalsAtThisLevel.length) {
                this._afterAllClosedAtThisLevel.next();
            }
        }
    };
    /**
     * @template T
     * @param {?} config
     * @param {?} modalRef
     * @param {?} modalContainer
     * @return {?}
     */
    NtModal.prototype._createInjector = /**
     * @template T
     * @param {?} config
     * @param {?} modalRef
     * @param {?} modalContainer
     * @return {?}
     */
    function (config, modalRef, modalContainer) {
        var /** @type {?} */ injectionTokens = new WeakMap();
        injectionTokens.set(NtModalRef, modalRef);
        injectionTokens.set(NtModalComponent, modalContainer);
        injectionTokens.set(NT_MODAL_DATA, config.data);
        return new PortalInjector(this._injector, injectionTokens);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NtModal.prototype._getOverlayConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var /** @type {?} */ positionStrategy = this._overlay.position()
            .global()
            .centerHorizontally();
        var /** @type {?} */ overlayConfig = new OverlayConfig({
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
    };
    NtModal.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NtModal.ctorParameters = function () { return [
        { type: Location, decorators: [{ type: Optional },] },
        { type: NtModalConfig, decorators: [{ type: Optional }, { type: Inject, args: [NT_MODAL_DEFAULT_CONFIG,] },] },
        { type: Overlay, },
        { type: Injector, },
        { type: OverlayContainer, },
        { type: ComponentFactoryResolver, },
        { type: ApplicationRef, },
    ]; };
    return NtModal;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtModalHeaderComponent = /** @class */ (function () {
    function NtModalHeaderComponent() {
    }
    NtModalHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-modal-header',
                    template: "<ng-content></ng-content>",
                    host: {
                        class: 'nt-modal-header'
                    }
                },] },
    ];
    /** @nocollapse */
    NtModalHeaderComponent.ctorParameters = function () { return []; };
    return NtModalHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtModalBodyComponent = /** @class */ (function () {
    function NtModalBodyComponent() {
    }
    NtModalBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-modal-body',
                    template: "<ng-content></ng-content>",
                    host: {
                        class: 'nt-modal-body'
                    }
                },] },
    ];
    /** @nocollapse */
    NtModalBodyComponent.ctorParameters = function () { return []; };
    return NtModalBodyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtModalFooterComponent = /** @class */ (function () {
    function NtModalFooterComponent() {
    }
    NtModalFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-modal-footer',
                    template: "<ng-content></ng-content>",
                    host: {
                        class: 'nt-modal-footer'
                    }
                },] },
    ];
    /** @nocollapse */
    NtModalFooterComponent.ctorParameters = function () { return []; };
    return NtModalFooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtModalModule = /** @class */ (function () {
    function NtModalModule() {
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
    NtModalModule.ctorParameters = function () { return []; };
    return NtModalModule;
}());

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
