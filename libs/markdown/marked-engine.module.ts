import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NT_MARKDOWN_ENGINE } from './markdown-engine';
import { NtMarkedEngine } from './marked-engine';
import { NT_MARKED_DEFAULT_OPTIONS, NT_MARKED_OPTIONS } from './marked-engine-options';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: NT_MARKDOWN_ENGINE, useClass: NtMarkedEngine },
    { provide: NT_MARKED_OPTIONS, useValue: NT_MARKED_DEFAULT_OPTIONS },
  ],
})
export class NtMarkedEngineModule { }
