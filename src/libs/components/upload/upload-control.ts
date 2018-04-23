import { EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NtFormFieldControl } from '@ng-tangram/components/forms';

import { Subscription } from 'rxjs/Subscription';

import { NtUpload } from './upload';
import { NtUploadControlError } from './upload-errors';
import { NtUploadStatus } from './upload-status';
import { HttpProgressEvent } from '@angular/common/http';

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

  constructor(protected _uploader: NtUpload, public ngControl: NgControl) {
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

  protected _getFormData(file: File): File | FormData {

    if (this.name) {
      const formData = new FormData();
      formData.append(this.name, file);
      return formData;
    }
    return file;
  }

  abstract setValue(value: T[]): void;
}
