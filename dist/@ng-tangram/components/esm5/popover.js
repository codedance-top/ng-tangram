import { Component, ViewEncapsulation, ElementRef, Input, Renderer2, ViewChild, NgModule } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { NtOverlayComponent, NtOverlayModule } from '@ng-tangram/components/core';
import { CommonModule } from '@angular/common';
import { NtDropdownModule } from '@ng-tangram/components/dropdown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPopoverPaneComponent = /** @class */ (function () {
    function NtPopoverPaneComponent() {
    }
    NtPopoverPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nt-popover-pane, [nt-popover-pane]',
                    template: "\n    <ng-content></ng-content>\n  ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NtPopoverPaneComponent.ctorParameters = function () { return []; };
    return NtPopoverPaneComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPopoverComponent = /** @class */ (function () {
    function NtPopoverComponent(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.title = '';
        this.position = 'top';
        this.origin = new OverlayOrigin(_elementRef);
    }
    NtPopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nt-popover]',
                    template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" trigger=\"click\" arrow> <div class=\"dropdown-pane small popover\"> <div class=\"popover-title\" *ngIf=\"title\">{{title}}</div> <div class=\"popover-pane\"> <ng-content select=\"nt-popover-pane\"></ng-content> </div> </div> </nt-overlay> ",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(click)': 'overlay.click()'
                    }
                },] },
    ];
    /** @nocollapse */
    NtPopoverComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    NtPopoverComponent.propDecorators = {
        "title": [{ type: Input, args: ['nt-popover',] },],
        "position": [{ type: Input },],
        "overlay": [{ type: ViewChild, args: [NtOverlayComponent,] },],
    };
    return NtPopoverComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NtPopoverModule = /** @class */ (function () {
    function NtPopoverModule() {
    }
    NtPopoverModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, NtOverlayModule, NtDropdownModule],
                    exports: [NtPopoverComponent, NtPopoverPaneComponent],
                    declarations: [NtPopoverComponent, NtPopoverPaneComponent]
                },] },
    ];
    /** @nocollapse */
    NtPopoverModule.ctorParameters = function () { return []; };
    return NtPopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NtPopoverModule, NtPopoverComponent, NtPopoverPaneComponent };
//# sourceMappingURL=popover.js.map
