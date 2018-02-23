import { Routes } from '@angular/router';

export const COMPONENTS_ROUTES: Routes = [
  { path: '', redirectTo: 'badge', pathMatch: 'full' },
  // { path: 'avatar', loadChildren: './avatar/avatar.module#AvatarDocumentModule', data: { title: 'Avatar ' } },
  { path: 'badge', loadChildren: './badge/badge.module#BadgeDocumentModule', data: { title: 'Badge 徽章' } },
  { path: 'breadcrumbs', loadChildren: './breadcrumbs/breadcrumbs.module#BreadcrumbsDocumentModule', data: { title: 'Breadcrumbs 面包屑' } },
  { path: 'button', loadChildren: './button/button.module#ButtonDocumentModule', data: { title: 'Button 按钮' } },
  { path: 'callout', loadChildren: './callout/callout.module#CalloutDocumentModule', data: { title: 'Callout 提示框' } },
  // { path: 'checkbox', loadChildren: './checkbox/checkbox.module#CheckboxDocumentModule', data: { title: 'Checkbox 复选框' } },
  // { path: 'collapse', loadChildren: './collapse/collapse.module#CollapseDocumentModule', data: { title: 'Collapse ' } },
  // { path: 'datatable', loadChildren: './datatable/datatable.module#DatatableDocumentModule', data: { title: 'Datatable ' } },
  // { path: 'date-picker', loadChildren: './date-picker/date-picker.module#DatePickerDocumentModule', data: { title: 'DatePicker ' } },
  // { path: 'date-picker-range', loadChildren: './date-picker-range/date-picker-range.module#DatePickerRangeDocumentModule',
  //   data: { title: 'DatePickerRange ' } },
  { path: 'dropdown', loadChildren: './dropdown/dropdown.module#DropdownDocumentModule', data: { title: 'Dropdown 下拉菜单' } },
  { path: 'forms', loadChildren: './forms/forms.module#FormsDocumentModule', data: { title: 'Forms 表单' } },
  { path: 'label', loadChildren: './label/label.module#LabelDocumentModule', data: { title: 'Label 标签' } },
  { path: 'menu', loadChildren: './menu/menu.module#MenuDocumentModule', data: { title: 'Menu 导航菜单' } },
  { path: 'modal', loadChildren: './modal/modal.module#ModalDocumentModule', data: { title: 'Modal 模态框' } },
  { path: 'pagination', loadChildren: './pagination/pagination.module#PaginationDocumentModule', data: { title: 'Pagination 分页' } },
  { path: 'popconfirm', loadChildren: './popconfirm/popconfirm.module#PopconfirmDocumentModule', data: { title: 'Popconfirm 气泡确认框' } },
  { path: 'popover', loadChildren: './popover/popover.module#PopoverDocumentModule', data: { title: 'Popover 气泡卡片' } },
  // { path: 'radio', loadChildren: './radio/radio.module#RadioDocumentModule', data: { title: 'Radio ' } },
  { path: 'scrim', loadChildren: './scrim/scrim.module#ScrimDocumentModule', data: { title: 'Scrim 纱幕' } },
  { path: 'select', loadChildren: './select/select.module#SelectDocumentModule', data: { title: 'Select 下拉选择框' } },
  // { path: 'switch', loadChildren: './switch/switch.module#SwitchDocumentModule', data: { title: 'Switch ' } },
  // { path: 'tabs', loadChildren: './tabs/tabs.module#TabsDocumentModule', data: { title: 'Tabs ' } },
  // { path: 'time-picker', loadChildren: './time-picker/time-picker.module#TimePickerDocumentModule', data: { title: 'TimePicker ' } },
  { path: 'tooltip', loadChildren: './tooltip/tooltip.module#TooltipDocumentModule', data: { title: 'Tooltip 提示' } },
  // { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderDocumentModule', data: { title: 'Uploader ' } },
];


