import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NtUploadHandler } from '@ng-tangram/components/core';

@Injectable()
export class NtNoopUploadHandler extends NtUploadHandler {

  constructor(http: HttpClient) { 
    super(http);
  }

  getRequestData(file: File | Blob) { return file; }

  getResponseData<T>(body: any): T { return body; }

  getErrorMessage(error: HttpErrorResponse) { return error.statusText; }
}