import { Routes } from "@angular/router";

export const PRO_ROUTES_CONFIG = [
  { name: 'context-menu', title: 'ContextMenu 右键菜单', module: 'ContextMenuDocumentModule' },
  { name: 'drawer', title: 'Drawer 抽屉式弹出框', module: 'DrawerDocumentModule' },
  { name: 'markdown-block', title: 'Markdown 块', module: 'MarkdownBlockDocumentModule' },
  { name: 'markdown-editor', title: 'Markdown 编辑器', module: 'MarkdownEditorDocumentModule' },
];

export const PRO_ROUTES: Routes = [
  { path: '', redirectTo: PRO_ROUTES_CONFIG[0].name, pathMatch: 'full' },
  ...PRO_ROUTES_CONFIG.map(route => {
    return {
      path: route.name,
      loadChildren: () => import(`./${route.name}/${route.name}.module`).then(mod => mod[route.module]),
      data: { title: route.title }
    };
  })
];
