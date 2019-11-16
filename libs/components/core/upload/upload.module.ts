import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { NT_UPLOAD_HANDLER, NtNoopUploadHandler, NtUploadHandler } from './upload-handler';

@NgModule()
export class NtUploadModule {
  public static forRoot(handler?: Type<NtUploadHandler>) : ModuleWithProviders<NtUploadModule> {
    return {
      ngModule: NtUploadModule,
      providers: [
        { provide: NT_UPLOAD_HANDLER, useClass: handler || NtNoopUploadHandler }
      ]
    };
  }
}
