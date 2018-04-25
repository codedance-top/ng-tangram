import { EventEmitter } from '@angular/core';
export declare type NtCalloutColor = 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
export declare type NtCalloutSize = 'small' | 'large' | 'medium';
export declare class NtCalloutComponent {
    private _display;
    private _closable;
    readonly display: boolean;
    title: string;
    color: NtCalloutColor;
    size: NtCalloutSize;
    closable: boolean;
    closed: EventEmitter<any>;
    constructor();
    _close(): void;
}
