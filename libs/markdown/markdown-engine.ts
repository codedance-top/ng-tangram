import { Observable } from 'rxjs';

import { InjectionToken } from '@angular/core';

export interface NtMarkdownEngine {

  // comple markdown to html
  compile(data: string): Observable<any>;

  // get the content from remote resource
  getContent(path: string): Observable<any>;
}

export const NT_MARKDOWN_ENGINE = new InjectionToken<NtMarkdownEngine>('nt-markdown-engine');
