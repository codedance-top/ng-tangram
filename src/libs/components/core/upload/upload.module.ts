import { NgModule } from '@angular/core';

import { NtFormDataUploadHandler } from './form-data-handler';
import { NT_UPLOAD_HANDLER } from './upload-handler';

@NgModule({
  providers: [
    { provide: NT_UPLOAD_HANDLER, useClass: NtFormDataUploadHandler }
  ]
})
export class NtUploadModule { }
