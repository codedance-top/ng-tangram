export const ACTION_ICONS_MAP: any = {
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

export declare type NtMarkdownEditorActionType =
  'bold' | 'italic' | 'strikethrough' |
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' |
  'code' | 'quote' |
  'ul' | 'ol' |
  'link' | 'image' | 'table' | 'line' |
  'preview' | 'help';

export class NtMarkdownEditorConfig {

  actions: Array<NtMarkdownEditorActionType[]> = [
    ['bold', 'italic'],
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    // ['code', 'quote'],
    ['ul', 'ol'],
    ['link', 'image', 'table'],
    ['preview', 'help']
  ];

  // getTooltip(action: string) { return  }

  getActionIcon(action: string) { return ACTION_ICONS_MAP[action]; }
}
