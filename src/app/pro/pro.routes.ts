import { Routes } from '@angular/router';

export const PRO_ROUTES: Routes = [
  { path: '', redirectTo: 'badge', pathMatch: 'full' },
  { path: 'context-menu', loadChildren: './context-menu/context-menu.module#ContextMenuDocumentModule', data: { title: 'ContextMenu 右键弹出' } },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryDocumentModule', data: { title: 'Gallery ' } },
  // { path: 'gantt', loadChildren: './gantt/gantt.module#BadgeDocumentModule', data: { title: 'Gantt 甘特图' } },
  { path: 'markdown', loadChildren: './markdown/markdown.module#MarkdownDocumentModule', data: { title: 'Markdown ' } },
  { path: 'markdown-editor', loadChildren: './markdown-editor/markdown-editor.module#MarkdownEditorDocumentModule', data: { title: 'Markdown 编辑器' } },
];
