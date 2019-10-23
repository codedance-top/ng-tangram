import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { NtFormDataUploadHandler } from './form-data-handler';
import { NT_UPLOAD_HANDLER, NtUploadHandler } from './upload-handler';

@NgModule()
export class NtUploadModule {
  public static forRoot(handler?: Type<NtUploadHandler>) : ModuleWithProviders {
    return {
      ngModule: NtUploadModule,
      providers: [
        { provide: NT_UPLOAD_HANDLER, useClass: handler || NtFormDataUploadHandler }
      ]
    };
  }
}
