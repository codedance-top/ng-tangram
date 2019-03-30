import { Routes } from '@angular/router';

export const PRO_ROUTES: Routes = [
  { path: '', redirectTo: 'context-menu', pathMatch: 'full' },
  { path: 'context-menu', loadChildren: './context-menu/context-menu.module#ContextMenuDocumentModule', data: { title: 'ContextMenu 右键菜单' } },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryDocumentModule', data: { title: 'Gallery 相册' } },
  { path: 'markdown', loadChildren: './markdown/markdown.module#MarkdownDocumentModule', data: { title: 'Markdown ' } },
  { path: 'markdown-editor', loadChildren: './markdown-editor/markdown-editor.module#MarkdownEditorDocumentModule', data: { title: '编辑器' } },
];
