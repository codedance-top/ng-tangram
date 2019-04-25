import { EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { NtUploadHandler } from './upload';
import { NtUploadControlError } from './upload-errors';
import { NtUploadStatus } from './upload-status';

export class NtUploadFile<T = any> {
  status: NtUploadStatus = NtUploadStatus.BEGIN;
  error?: string;
  data?: T;

  constructor(
    public name: string,
    public size?: number,
    public type?: string,
    public link?: string) { }
}

export abstract class NtUploadControl<T extends NtUploadFile> extends NtFormFieldControl<T[]> {

  readonly value: T[];

  readonly maxSize: number;

  readonly accept: string | string[];

  readonly url: string;

  readonly files: T[];

  readonly autoupload: boolean;

  readonly error: EventEmitter<NtUploadControlError>;

  readonly remove: EventEmitter<T>;

  name: string;

  protected _onChange: (value: any) => void = () => {};

  protected _onTouched = () => {};

  constructor(protected _uploader: NtUploadHandler, public ngControl: NgControl) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: T[]) {
    if (value) {
      this.setValue(value);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  abstract setValue(value: T[]): void;
}
