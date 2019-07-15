import { InjectionToken } from '@angular/core';

export interface NtMarkdownEditorIcons {
  bold: string;
  italic: string;
  strikethrough: string;

  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;

  code: string;
  quote: string;

  ul: string;
  ol: string;

  link: string;
  image: string;
  table: string;
  line: string;
  preview: string;
  help: string;
}

export const DEFAULT_MARKDOWN_EDITOR_ICONS: NtMarkdownEditorIcons = {
  bold: 'fa fa-bold',
  italic: 'fa fa-italic',
  strikethrough: 'fa fa-strikethrough',

  h1: 'fa fa-heading fa-heading-x fa-heading-1',
  h2: 'fa fa-heading fa-heading-x fa-heading-2',
  h3: 'fa fa-heading fa-heading-x fa-heading-3',
  h4: 'fa fa-heading fa-heading-x fa-heading-4',
  h5: 'fa fa-heading fa-heading-x fa-heading-5',
  h6: 'fa fa-heading fa-heading-x fa-heading-6',

  code: 'fa fa-code',
  quote: 'fa fa-quote-left',

  ul: 'fa fa-list-ul',
  ol: 'fa fa-list-ol',

  link: 'fa fa-link',
  image: 'fa fa-image',
  table: 'fa fa-table',
  line: 'fa fa-minus',
  preview: 'fas fa-columns',
  help: 'fab fa-markdown',
};

export const NT_MARKDOWN_EDITOR_ICONS = new InjectionToken<NtMarkdownEditorIcons>('nt-markdown-editor-icons');
