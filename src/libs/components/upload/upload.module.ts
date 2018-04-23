

import { NgModule } from '@angular/core';
import { NtUpload } from './upload';
import { NT_UPLOAD_INTERCEPTOR, NtUploadInterceptor } from './upload-interceptor';

@NgModule({
  providers: [
    { provide: NT_UPLOAD_INTERCEPTOR, useClass: NtUploadInterceptor },
    NtUpload
  ],
})
export class NtUploadModule { }
