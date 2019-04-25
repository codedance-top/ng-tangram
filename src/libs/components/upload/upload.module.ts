import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { NT_UPLOAD_HANDLER, NtUpload, NtUploadHandler } from './upload';

@NgModule({
  providers: [
    { provide: NT_UPLOAD_HANDLER, useClass: NtUpload  }
  ],
})
export class NtUploadModule {
  public static forRoot(handler?: Type<NtUploadHandler>): ModuleWithProviders {
    return {
      ngModule: NtUploadModule,
      providers: [
        { provide: NT_UPLOAD_HANDLER, useClass: handler || NtUpload }
      ]
    };
  }
}
