import { MarkedOptions } from 'marked';

import { InjectionToken } from '@angular/core';

export const NT_MARKED_DEFAULT_OPTIONS: MarkedOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
};

export const NT_MARKED_OPTIONS = new InjectionToken<MarkedOptions>('nt-marked-options');
