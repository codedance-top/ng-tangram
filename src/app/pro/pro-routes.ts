import { Routes } from '@angular/router';

export const PRO_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'context-menu',
    pathMatch: 'full'
  },
  {
    path: 'context-menu',
    data: { title: 'ContextMenu 右键菜单' },
    loadChildren: () => import('./context-menu/context-menu.module').then(mod => mod.ContextMenuDocumentModule)
  },
  {
    path: 'markdown-block',
    data: { title: 'Markdown 块' },
    loadChildren: () => import('./markdown-block/markdown-block.module').then(mod => mod.MarkdownBlockDocumentModule)
  },
  {
    path: 'markdown-editor',
    data: { title: 'Markdown 编辑器' },
    loadChildren: () => import('./markdown-editor/markdown-editor.module').then(mod => mod.MarkdownEditorDocumentModule)
  },
];
