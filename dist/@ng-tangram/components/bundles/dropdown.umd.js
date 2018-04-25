(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/overlay'), require('@ng-tangram/components/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/overlay', '@ng-tangram/components/core', '@angular/common'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.dropdown = {}),global.ng.core,global.ng.cdk.overlay,global.nt.components.core,global.ng.common));
}(this, (function (exports,core,overlay,core$1,common) { 'use strict';

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
            { type: core.Component, args: [{
                        selector: 'nt-dropdown-pane, [nt-dropdown-pane]',
                        template: '<ng-content></ng-content>',
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[class]': '["dropdown-pane", size, class].join(" ")'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtDropdownPaneComponent.ctorParameters = function () { return []; };
        NtDropdownPaneComponent.propDecorators = {
            "size": [{ type: core.Input },],
            "class": [{ type: core.Input },],
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
            this.origin = new overlay.OverlayOrigin(_elementRef);
        }
        NtDropdownComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-dropdown, [nt-dropdown]',
                        template: "<ng-content></ng-content> <nt-overlay [origin]=\"origin\" [position]=\"position\" [trigger]=\"trigger\"> <ng-content select=\"nt-dropdown-pane\"></ng-content> </nt-overlay> ",
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '(click)': 'overlay.click()',
                            '(mouseenter)': 'overlay.onMouseEnter()',
                            '(mouseleave)': 'overlay.onMouseLeave()'
                        }
                    },] },
        ];
        /** @nocollapse */
        NtDropdownComponent.ctorParameters = function () { return [
            { type: core.Renderer2, },
            { type: core.ElementRef, },
        ]; };
        NtDropdownComponent.propDecorators = {
            "position": [{ type: core.Input },],
            "trigger": [{ type: core.Input },],
            "overlay": [{ type: core.ViewChild, args: [core$1.NtOverlayComponent,] },],
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, core$1.NtOverlayModule],
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

    exports.NtDropdownModule = NtDropdownModule;
    exports.NtDropdownComponent = NtDropdownComponent;
    exports.NtDropdownPaneComponent = NtDropdownPaneComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dropdown.umd.js.map
