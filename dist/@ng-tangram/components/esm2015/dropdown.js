import { Component, Input, ViewEncapsulation, ElementRef, Renderer2, ViewChild, NgModule } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayComponent, NtOverlayModule } from '@ng-tangram/components/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtDropdownPaneComponent {
    constructor() {
        this.size = 'small';
        this.class = '';
    }
}
NtDropdownPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class]': '["dropdown-pane", size, class].join(" ")'
                }
            },] },
];
/** @nocollapse */
NtDropdownPaneComponent.ctorParameters = () => [];
NtDropdownPaneComponent.propDecorators = {
    "size": [{ type: Input },],
    "class": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtDropdownComponent {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.position = 'bottomLeft';
        this.trigger = 'hover';
        this.origin = new OverlayOrigin(_elementRef);
    }
}
NtDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'nt-dropdown, [nt-dropdown]',
                template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" [trigger]=\"trigger\"> <ng-content select=\"nt-dropdown-pane\"></ng-content> </nt-overlay> ",
                encapsulation: ViewEncapsulation.None,
                host: {
                    '(click)': 'overlay.click()',
                    '(mouseenter)': 'overlay.onMouseEnter()',
                    '(mouseleave)': 'overlay.onMouseLeave()'
                }
            },] },
];
/** @nocollapse */
NtDropdownComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
NtDropdownComponent.propDecorators = {
    "position": [{ type: Input },],
    "trigger": [{ type: Input },],
    "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NtDropdownModule {
}
NtDropdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NtOverlayModule],
                entryComponents: [NtDropdownComponent],
                exports: [NtDropdownComponent, NtDropdownPaneComponent],
                declarations: [NtDropdownComponent, NtDropdownPaneComponent]
            },] },
];
/** @nocollapse */
NtDropdownModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtDropdownModule, NtDropdownComponent, NtDropdownPaneComponent };
//# sourceMappingURL=dropdown.js.map
