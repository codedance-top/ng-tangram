import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtMarkdownBlockModule } from '@ng-tangram/pro/markdown-block';

import { NT_MARKDOWN_EDITOR_ICONS, NtMarkdownEditorIcons } from './markdown-editor-icons';
import { NtMarkdownEditorComponent } from './markdown-editor.component';

const DEFAULT_MARKDOWN_EDITOR_ICONS: NtMarkdownEditorIcons = {
  'bold': 'fa fa-bold',
  'italic': 'fa fa-italic',
  'strikethrough': 'fa fa-strikethrough',

  'h1': 'fa fa-heading fa-heading-x fa-heading-1',
  'h2': 'fa fa-heading fa-heading-x fa-heading-2',
  'h3': 'fa fa-heading fa-heading-x fa-heading-3',
  'h4': 'fa fa-heading fa-heading-x fa-heading-4',
  'h5': 'fa fa-heading fa-heading-x fa-heading-5',
  'h6': 'fa fa-heading fa-heading-x fa-heading-6',

  'code': 'fa fa-code',
  'quote': 'fa fa-quote-left',

  'ul': 'fa fa-list-ul',
  'ol': 'fa fa-list-ol',

  'link': 'fa fa-link',
  'image': 'fa fa-image',
  'table': 'fa fa-table',
  'line': 'fa fa-minus',
  'preview': 'fa fa-eye',
  'help': 'fa fa-question',
};

@NgModule({
  imports: [CommonModule, NtMarkdownBlockModule],
  exports: [NtMarkdownEditorComponent],
  declarations: [NtMarkdownEditorComponent],
  providers: [
    { provide: NT_MARKDOWN_EDITOR_ICONS, useValue: DEFAULT_MARKDOWN_EDITOR_ICONS }
  ]
})
export class NtMarkdownEditorModule {
  public static forRoot(icons: NtMarkdownEditorIcons = DEFAULT_MARKDOWN_EDITOR_ICONS): ModuleWithProviders {
    return {
      ngModule: NtMarkdownEditorModule,
      providers: [
        { provide: NT_MARKDOWN_EDITOR_ICONS, useValue: icons }
      ]
    };
  }
}
