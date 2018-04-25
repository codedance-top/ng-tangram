(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/overlay'), require('@ng-tangram/components/core'), require('@angular/common'), require('@ng-tangram/components/dropdown')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/overlay', '@ng-tangram/components/core', '@angular/common', '@ng-tangram/components/dropdown'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.popover = {}),global.ng.core,global.ng.cdk.overlay,global.nt.components.core,global.ng.common,global.nt.components.dropdown));
}(this, (function (exports,core,overlay,core$1,common,dropdown) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtPopoverPaneComponent = /** @class */ (function () {
        function NtPopoverPaneComponent() {
        }
        NtPopoverPaneComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-popover-pane, [nt-popover-pane]',
                        template: "\n    <ng-content></ng-content>\n  ",
                        encapsulation: core.ViewEncapsulation.None
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
            this.origin = new overlay.OverlayOrigin(_elementRef);
        }
        NtPopoverComponent.decorators = [
            { type: core.Component, args: [{
                        selector: '[nt-popover]',
                        template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" trigger=\"click\" arrow> <div class=\"dropdown-pane small popover\"> <div class=\"popover-title\" *ngIf=\"title\">{{title}}</div> <div class=\"popover-pane\"> <ng-content select=\"nt-popover-pane\"></ng-content> </div> </div> </nt-overlay> ",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '(click)': 'overlay.click()'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtPopoverComponent.ctorParameters = function () { return [
            { type: core.Renderer2, },
            { type: core.ElementRef, },
        ]; };
        NtPopoverComponent.propDecorators = {
            "title": [{ type: core.Input, args: ['nt-popover',] },],
            "position": [{ type: core.Input },],
            "overlay": [{ type: core.ViewChild, args: [core$1.NtOverlayComponent,] },],
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, core$1.NtOverlayModule, dropdown.NtDropdownModule],
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

    exports.NtPopoverModule = NtPopoverModule;
    exports.NtPopoverComponent = NtPopoverComponent;
    exports.NtPopoverPaneComponent = NtPopoverPaneComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=popover.umd.js.map
