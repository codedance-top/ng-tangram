import { AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export interface NtOptionParentComponent {
    disabled?: boolean;
    multiple?: boolean;
}
export declare class NtOptionSelectionChange {
    source: NtOptionComponent;
    isUserInput: boolean;
    constructor(source: NtOptionComponent, isUserInput?: boolean);
}
export declare const NT_OPTION_PARENT_COMPONENT: InjectionToken<NtOptionParentComponent>;
export declare class NtOptionComponent implements AfterViewChecked {
    private _element;
    private _changeDetectorRef;
    private _parent;
    private _value;
    private _selected;
    private _disabled;
    private _mostRecentViewValue;
    readonly label: any;
    readonly multiple: boolean | undefined;
    value: any;
    disabled: boolean;
    readonly selected: boolean;
    readonly stateChanges: Subject<void>;
    readonly selectionChange: EventEmitter<NtOptionSelectionChange>;
    constructor(_element: ElementRef, _changeDetectorRef: ChangeDetectorRef, _parent: NtOptionParentComponent);
    ngAfterViewChecked(): void;
    focus(): void;
    select(): void;
    deselect(): void;
    selectViaInteraction(): void;
    getOffsetY(): any;
    private _emitSelectionChangeEvent(isUserInput?);
}
