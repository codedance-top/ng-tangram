export declare type NtMarkdownEditorActionType =
  'bold' | 'italic' | 'strikethrough' |
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' |
  'code' | 'quote' |
  'ul' | 'ol' |
  'link' | 'image' | 'table' | 'line' |
  'preview' | 'help';

export class NtMarkdownEditorConfig {

  actions: Array<NtMarkdownEditorActionType[]> = [
    ['bold', 'italic', 'strikethrough'],
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    // ['code', 'quote'],
    ['ul', 'ol'],
    ['link', 'image', 'table'],
    ['preview', 'help']
  ];
}
