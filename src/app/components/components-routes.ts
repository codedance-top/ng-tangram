import { Routes } from "@angular/router";

export const COMPONENTS_ROUTES_CONFIG = [
  { name: 'avatar', module: 'AvatarDocumentModule', title: 'Avatar 头像' },
  { name: 'badge', module: 'BadgeDocumentModule', title: 'Badge 徽章' },
  { name: 'breadcrumbs', module: 'BreadcrumbsDocumentModule', title: 'Breadcrumbs 面包屑' },
  { name: 'button', module: 'ButtonDocumentModule', title: 'Button 按钮' },
  { name: 'callout', module: 'CalloutDocumentModule', title: 'Callout 提示框' },
  { name: 'checkbox', module: 'CheckboxDocumentModule', title: 'Checkbox 复选框' },
  // { name: 'collapse', module: 'CollapseDocumentModule', title: 'Collapse ' },
  { name: 'datepicker', module: 'DatePickerDocumentModule', title: 'DatePicker 日期选择框' },
  // { name: 'datepicker-range', module: 'range/datepicker-range', title: 'DatePickerRange ' },
  { name: 'dropdown', module: 'DropdownDocumentModule', title: 'Dropdown 下拉菜单' },
  { name: 'forms', module: 'FormsDocumentModule', title: 'Forms 表单' },
  { name: 'file', module: 'FileDocumentModule', title: 'File 文件' },
  { name: 'input', module: 'InputDocumentModule', title: 'Input 输入框' },
  { name: 'label', module: 'LabelDocumentModule', title: 'Label 标签' },
  { name: 'menu', module: 'MenuDocumentModule', title: 'Menu 导航菜单' },
  { name: 'modal', module: 'ModalDocumentModule', title: 'Modal 模态框' },
  { name: 'pagination', module: 'PaginationDocumentModule', title: 'Pagination 分页' },
  { name: 'popconfirm', module: 'PopconfirmDocumentModule', title: 'Popconfirm 气泡确认框' },
  { name: 'popover', module: 'PopoverDocumentModule', title: 'Popover 气泡卡片' },
  { name: 'picture', module: 'PictureDocumentModule', title: 'Picture 图片' },
  { name: 'progress', module: 'ProgressDocumentModule', title: 'Progress 进度条' },
  { name: 'radio', module: 'RadioDocumentModule', title: 'Radio 单选框' },
  { name: 'scrim', module: 'ScrimDocumentModule', title: 'Scrim 纱幕' },
  { name: 'select', module: 'SelectDocumentModule', title: 'Select 下拉选择框' },
  { name: 'switch', module: 'SwitchDocumentModule', title: 'Switch 开关' },
  // { name: 'tabs', module: 'TabsDocumentModule', title: 'Tabs ' },
  // { name: 'timepicker', module: 'picker.module: { title: 'TimePicker ' },
  { name: 'table', module: 'TableDocumentModule', title: 'Table 表格' },
  { name: 'tooltip', module: 'TooltipDocumentModule', title: 'Tooltip 提示' },
  { name: 'tree', module: 'TreeDocumentModule', title: 'Tree 树' },
];

export const COMPONENTS_ROUTES: Routes = [
  { path: '', redirectTo: COMPONENTS_ROUTES_CONFIG[0].name, pathMatch: 'full' },
  ...COMPONENTS_ROUTES_CONFIG.map(route => {
    return {
      path: route.name,
      loadChildren: () => import(`./${route.name}/${route.name}.module`).then(mod => mod[route.module]),
      data: { title: route.title }
    };
  })
];
