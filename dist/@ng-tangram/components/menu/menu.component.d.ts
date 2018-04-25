import { AfterContentInit, QueryList } from '@angular/core';
export declare type NtMenuAlign = '' | 'center' | 'right';
export declare type NtMenuOrientation = '' | 'horizontal' | 'vertical';
export declare class NtMenuComponent implements AfterContentInit {
    private _simple;
    private _expanded;
    private _nested;
    private _align;
    class: string;
    simple: boolean;
    expanded: boolean;
    nested: boolean;
    align: NtMenuAlign;
    orientation: NtMenuOrientation;
    childMenus: QueryList<NtMenuComponent>;
    constructor();
    ngAfterContentInit(): void;
}
