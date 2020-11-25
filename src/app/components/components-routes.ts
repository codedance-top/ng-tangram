import { Routes } from '@angular/router';

export const COMPONENTS_GROUPS = [
  'general 常规',
  'forms 表单',
  'layer 弹层',
  'data 数据',
  'markdown'
];

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'getting-starter',
    pathMatch: 'full'
  },
  {
    path: 'getting-starter',
    loadChildren: () => import('./_getting-starter/getting-starter.module').then(mod => mod.GettingStarterModule),
    data: { title: '开始使用' }
  },
  {
    path: 'changelog',
    loadChildren: () => import('./_changelog/changelog.module').then(mod => mod.ChangelogModule),
    data: { title: '更新日志' }
  },
  {
    path: 'autocomplete',
    loadChildren: () => import('./autocomplete/autocomplete.module').then(mod => mod.AutocompleteDocumentModule),
    data: { title: 'Autocomplete 自动完成', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'avatar',
    loadChildren: () => import('./avatar/avatar.module').then(mod => mod.AvatarDocumentModule),
    data: { title: 'Avatar 头像', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'badge',
    loadChildren: () => import('./badge/badge.module').then(mod => mod.BadgeDocumentModule),
    data: { title: 'Badge 徽章', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'breadcrumbs',
    loadChildren: () => import('./breadcrumbs/breadcrumbs.module').then(mod => mod.BreadcrumbsDocumentModule),
    data: { title: 'Breadcrumbs 面包屑', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'button',
    loadChildren: () => import('./button/button.module').then(mod => mod.ButtonDocumentModule),
    data: { title: 'Button 按钮', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'callout',
    loadChildren: () => import('./callout/callout.module').then(mod => mod.CalloutDocumentModule),
    data: { title: 'Callout 提示框', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./checkbox/checkbox.module').then(mod => mod.CheckboxDocumentModule),
    data: { title: 'Checkbox 复选框', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'contextmenu',
    data: { title: 'ContextMenu 右键菜单', group: COMPONENTS_GROUPS[2] },
    loadChildren: () => import('./contextmenu/contextmenu.module').then(mod => mod.ContextMenuDocumentModule)
  },
  {
    path: 'datepicker',
    loadChildren: () => import('./datepicker/datepicker.module').then(mod => mod.DatePickerDocumentModule),
    data: { title: 'DatePicker 日期选择框', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'drawer',
    data: { title: 'Drawer 抽屉式弹出框', group: COMPONENTS_GROUPS[2] },
    loadChildren: () => import('./drawer/drawer.module').then(mod => mod.DrawerDocumentModule)
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./dropdown/dropdown.module').then(mod => mod.DropdownDocumentModule),
    data: { title: 'Dropdown 下拉菜单', group: COMPONENTS_GROUPS[2] }
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then(mod => mod.FormsDocumentModule),
    data: { title: 'Forms 表单', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'attachment',
    loadChildren: () => import('./attachment/attachment.module').then(mod => mod.AttachmentDocumentModule),
    data: { title: 'Attachment 附件', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'input',
    loadChildren: () => import('./input/input.module').then(mod => mod.InputDocumentModule),
    data: { title: 'Input 输入框', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'label',
    loadChildren: () => import('./label/label.module').then(mod => mod.LabelDocumentModule),
    data: { title: 'Label 标签', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(mod => mod.MenuDocumentModule),
    data: { title: 'Menu 导航菜单', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(mod => mod.ModalDocumentModule),
    data: { title: 'Modal 模态框', group: COMPONENTS_GROUPS[2] }
  },
  {
    path: 'notifier',
    loadChildren: () => import('./notifier/notifier.module').then(mod => mod.NotifierDocumentModule),
    data: { title: 'Nofitier 通知栏', group: COMPONENTS_GROUPS[2] }
  },
  {
    path: 'pagination',
    loadChildren: () => import('./pagination/pagination.module').then(mod => mod.PaginationDocumentModule),
    data: { title: 'Pagination 分页', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'popconfirm',
    loadChildren: () => import('./popconfirm/popconfirm.module').then(mod => mod.PopconfirmDocumentModule),
    data: { title: 'Popconfirm 气泡确认框', group: COMPONENTS_GROUPS[2] }
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then(mod => mod.PopoverDocumentModule),
    data: { title: 'Popover 气泡卡片', group: COMPONENTS_GROUPS[2] }
  },
  {
    path: 'picture',
    loadChildren: () => import('./picture/picture.module').then(mod => mod.PictureDocumentModule),
    data: { title: 'Picture 图片', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'progress',
    loadChildren: () => import('./progress/progress.module').then(mod => mod.ProgressDocumentModule),
    data: { title: 'Progress 进度条', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.module').then(mod => mod.RadioDocumentModule),
    data: { title: 'Radio 单选框', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'scrim',
    loadChildren: () => import('./scrim/scrim.module').then(mod => mod.ScrimDocumentModule),
    data: { title: 'Scrim 纱幕', group: COMPONENTS_GROUPS[3] }
  },
  {
    path: 'select',
    loadChildren: () => import('./select/select.module').then(mod => mod.SelectDocumentModule),
    data: { title: 'Select 下拉选择框', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'slider',
    loadChildren: () => import('./slider/slider.module').then(mod => mod.SliderDocumentModule),
    data: { title: 'Slider 滚动条', group: COMPONENTS_GROUPS[1] }
  },
  {
    path: 'switch',
    loadChildren: () => import('./switch/switch.module').then(mod => mod.SwitchDocumentModule),
    data: { title: 'Switch 开关', group: COMPONENTS_GROUPS[0] }
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.module').then(mod => mod.TableDocumentModule),
    data: { title: 'Table 表格', group: COMPONENTS_GROUPS[3] }
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./tooltip/tooltip.module').then(mod => mod.TooltipDocumentModule),
    data: { title: 'Tooltip 提示', group: COMPONENTS_GROUPS[2] }
  },
  {
    path: 'tree',
    loadChildren: () => import('./tree/tree.module').then(mod => mod.TreeDocumentModule),
    data: { title: 'Tree 树', group: COMPONENTS_GROUPS[3] }
  },
  {
    path: 'markdown',
    data: { title: 'Markdown 块', group: COMPONENTS_GROUPS[4] },
    loadChildren: () => import('./markdown/markdown.module').then(mod => mod.MarkdownDocumentModule)
  },
  {
    path: 'markdown-editor',
    data: { title: 'Markdown 编辑器', group: COMPONENTS_GROUPS[4] },
    loadChildren: () => import('./markdown-editor/markdown-editor.module').then(mod => mod.MarkdownEditorDocumentModule)
  },
];
