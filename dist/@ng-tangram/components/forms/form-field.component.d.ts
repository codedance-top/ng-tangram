import { AfterViewInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { NtFormFieldControl } from './form-field-control';
export declare type NtFormFieldOrientation = 'vertical' | 'horizontal';
export declare class NtFormFieldComponent implements AfterViewInit, OnDestroy {
    private _ngZone;
    private _changeDetectorRef;
    private _parentForm;
    private _parentFormGroup;
    /** 表单可见性 */
    private _labelVisible;
    private readonly _destroy;
    _invalid: boolean;
    label: string;
    labelVisible: boolean;
    readonly horizontal: boolean;
    readonly required: boolean | null;
    readonly errors: {
        [key: string]: any;
    } | null;
    orientation: NtFormFieldOrientation;
    /** 表单正确时的样式 */
    /** 表单错误时的样式 */
    /** 表单模型 */
    control: NtFormFieldControl<any>;
    readonly ngSubmit: Observable<any> | null;
    readonly ngControl: NgControl | null;
    readonly statusChanges: Observable<any>;
    constructor(_ngZone: NgZone, _changeDetectorRef: ChangeDetectorRef, _parentForm: NgForm, _parentFormGroup: FormGroupDirective);
    ngAfterViewInit(): void;
    private _validate();
    ngOnDestroy(): void;
}
