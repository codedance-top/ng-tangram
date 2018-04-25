import { Component, Input, ViewEncapsulation, ElementRef, Renderer2, ViewChild, NgModule } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayComponent, NtOverlayModule } from '@ng-tangram/components/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtDropdownPaneComponent = /** @class */ (function () {
    function NtDropdownPaneComponent() {
        this.size = 'small';
        this.class = '';
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
    NtDropdownPaneComponent.ctorParameters = function () { return []; };
    NtDropdownPaneComponent.propDecorators = {
        "size": [{ type: Input },],
        "class": [{ type: Input },],
    };
    return NtDropdownPaneComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtDropdownComponent = /** @class */ (function () {
    function NtDropdownComponent(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.position = 'bottomLeft';
        this.trigger = 'hover';
        this.origin = new OverlayOrigin(_elementRef);
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
    NtDropdownComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NtDropdownComponent.propDecorators = {
        "position": [{ type: Input },],
        "trigger": [{ type: Input },],
        "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
    };
    return NtDropdownComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtDropdownModule = /** @class */ (function () {
    function NtDropdownModule() {
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
    NtDropdownModule.ctorParameters = function () { return []; };
    return NtDropdownModule;
}());

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
