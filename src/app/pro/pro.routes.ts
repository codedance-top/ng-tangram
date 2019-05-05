import { Routes } from '@angular/router';

export const PRO_ROUTES: Routes = [
  { path: '', redirectTo: 'context-menu', pathMatch: 'full' },
  { path: 'context-menu', loadChildren: './context-menu/context-menu.module#ContextMenuDocumentModule', data: { title: 'ContextMenu 右键菜单' } },
  { path: 'markdown-block', loadChildren: './markdown-block/markdown-block.module#MarkdownBlockDocumentModule', data: { title: 'Markdown 块' } },
  { path: 'markdown-editor', loadChildren: './markdown-editor/markdown-editor.module#MarkdownEditorDocumentModule', data: { title: 'Markdown 编辑器' } },
];
