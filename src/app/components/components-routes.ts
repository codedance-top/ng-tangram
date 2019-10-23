import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '', redirectTo: 'avatar', pathMatch: 'full'
  },
  {
    path: 'avatar',
    loadChildren: () => import('./avatar/avatar.module').then(mod => mod.AvatarDocumentModule),
    data: { title: 'Avatar 头像' }
  },
  {
    path: 'badge',
    loadChildren: () => import('./badge/badge.module').then(mod => mod.BadgeDocumentModule),
    data: { title: 'Badge 徽章' }
  },
  {
    path: 'breadcrumbs',
    loadChildren: () => import('./breadcrumbs/breadcrumbs.module').then(mod => mod.BreadcrumbsDocumentModule),
    data: { title: 'Breadcrumbs 面包屑' }
  },
  {
    path: 'button',
    loadChildren: () => import('./button/button.module').then(mod => mod.ButtonDocumentModule),
    data: { title: 'Button 按钮' }
  },
  {
    path: 'callout',
    loadChildren: () => import('./callout/callout.module').then(mod => mod.CalloutDocumentModule),
    data: { title: 'Callout 提示框' }
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./checkbox/checkbox.module').then(mod => mod.CheckboxDocumentModule),
    data: { title: 'Checkbox 复选框' }
  },
  {
    path: 'datepicker',
    loadChildren: () => import('./datepicker/datepicker.module').then(mod => mod.DatePickerDocumentModule),
    data: { title: 'DatePicker 日期选择框' }
  },
  {
    path: 'drawer',
    data: { title: 'Drawer 抽屉式弹出框' },
    loadChildren: () => import('./drawer/drawer.module').then(mod => mod.DrawerDocumentModule)
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./dropdown/dropdown.module').then(mod => mod.DropdownDocumentModule),
    data: { title: 'Dropdown 下拉菜单' }
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then(mod => mod.FormsDocumentModule),
    data: { title: 'Forms 表单' }
  },
  {
    path: 'file',
    loadChildren: () => import('./file/file.module').then(mod => mod.FileDocumentModule),
    data: { title: 'File 文件' }
  },
  {
    path: 'input',
    loadChildren: () => import('./input/input.module').then(mod => mod.InputDocumentModule),
    data: { title: 'Input 输入框' }
  },
  {
    path: 'label',
    loadChildren: () => import('./label/label.module').then(mod => mod.LabelDocumentModule),
    data: { title: 'Label 标签' }
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(mod => mod.MenuDocumentModule),
    data: { title: 'Menu 导航菜单' }
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(mod => mod.ModalDocumentModule),
    data: { title: 'Modal 模态框' }
  },
  {
    path: 'pagination',
    loadChildren: () => import('./pagination/pagination.module').then(mod => mod.PaginationDocumentModule),
    data: { title: 'Pagination 分页' }
  },
  {
    path: 'popconfirm',
    loadChildren: () => import('./popconfirm/popconfirm.module').then(mod => mod.PopconfirmDocumentModule),
    data: { title: 'Popconfirm 气泡确认框' }
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then(mod => mod.PopoverDocumentModule),
    data: { title: 'Popover 气泡卡片' }
  },
  {
    path: 'picture',
    loadChildren: () => import('./picture/picture.module').then(mod => mod.PictureDocumentModule),
    data: { title: 'Picture 图片' }
  },
  {
    path: 'progress',
    loadChildren: () => import('./progress/progress.module').then(mod => mod.ProgressDocumentModule),
    data: { title: 'Progress 进度条' }
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.module').then(mod => mod.RadioDocumentModule),
    data: { title: 'Radio 单选框' }
  },
  {
    path: 'scrim',
    loadChildren: () => import('./scrim/scrim.module').then(mod => mod.ScrimDocumentModule),
    data: { title: 'Scrim 纱幕' }
  },
  {
    path: 'select',
    loadChildren: () => import('./select/select.module').then(mod => mod.SelectDocumentModule),
    data: { title: 'Select 下拉选择框' }
  },
  {
    path: 'switch',
    loadChildren: () => import('./switch/switch.module').then(mod => mod.SwitchDocumentModule),
    data: { title: 'Switch 开关' }
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.module').then(mod => mod.TableDocumentModule),
    data: { title: 'Table 表格' }
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./tooltip/tooltip.module').then(mod => mod.TooltipDocumentModule),
    data: { title: 'Tooltip 提示' }
  },
  {
    path: 'tree',
    loadChildren: () => import('./tree/tree.module').then(mod => mod.TreeDocumentModule),
    data: { title: 'Tree 树' }
  },
];
