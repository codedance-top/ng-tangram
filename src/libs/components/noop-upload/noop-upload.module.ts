import { NgModule } from '@angular/core';
import { NtUploadHandler } from '@ng-tangram/components/core';

import { NtNoopUploadHandler } from './noop-upload-handler';



@NgModule({
  providers: [
    { provide: NtUploadHandler, useClass: NtNoopUploadHandler }
  ]
})
export class NtNoopUploadModule { }