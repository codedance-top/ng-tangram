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

export const NT_MARKDOWN_EDITOR_ICONS = new InjectionToken<NtMarkdownEditorIcons>('nt-markdown-editor-icons');
