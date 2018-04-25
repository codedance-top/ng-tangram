(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ng-tangram/components/icon'), require('@ng-tangram/components/badge'), require('@ng-tangram/components/breadcrumbs'), require('@ng-tangram/components/button'), require('@ng-tangram/components/callout'), require('@ng-tangram/components/core'), require('@ng-tangram/components/datepicker'), require('@ng-tangram/components/dropdown'), require('@ng-tangram/components/file'), require('@ng-tangram/components/forms'), require('@ng-tangram/components/input'), require('@ng-tangram/components/label'), require('@ng-tangram/components/menu'), require('@ng-tangram/components/modal'), require('@ng-tangram/components/pagination'), require('@ng-tangram/components/picture'), require('@ng-tangram/components/popconfirm'), require('@ng-tangram/components/progress'), require('@ng-tangram/components/popover'), require('@ng-tangram/components/scrim'), require('@ng-tangram/components/select'), require('@ng-tangram/components/table'), require('@ng-tangram/components/tooltip'), require('@ng-tangram/components/upload')) :
	typeof define === 'function' && define.amd ? define(['exports', '@ng-tangram/components/icon', '@ng-tangram/components/badge', '@ng-tangram/components/breadcrumbs', '@ng-tangram/components/button', '@ng-tangram/components/callout', '@ng-tangram/components/core', '@ng-tangram/components/datepicker', '@ng-tangram/components/dropdown', '@ng-tangram/components/file', '@ng-tangram/components/forms', '@ng-tangram/components/input', '@ng-tangram/components/label', '@ng-tangram/components/menu', '@ng-tangram/components/modal', '@ng-tangram/components/pagination', '@ng-tangram/components/picture', '@ng-tangram/components/popconfirm', '@ng-tangram/components/progress', '@ng-tangram/components/popover', '@ng-tangram/components/scrim', '@ng-tangram/components/select', '@ng-tangram/components/table', '@ng-tangram/components/tooltip', '@ng-tangram/components/upload'], factory) :
	(factory((global.nt = global.nt || {}, global.nt.components = {}),global.nt.components.icon,global.nt.components.badge,global.nt.components.breadcrumbs,global.nt.components.button,global.nt.components.callout,global.nt.components.core,global.nt.components.datepicker,global.nt.components.dropdown,global.nt.components.file,global.nt.components.forms,global.nt.components.input,global.nt.components.label,global.nt.components.menu,global.nt.components.modal,global.nt.components.pagination,global.nt.components.picture,global.nt.components.popconfirm,global.nt.components.progress,global.nt.components.popover,global.nt.components.scrim,global.nt.components.select,global.nt.components.table,global.nt.components.tooltip,global.nt.components.upload));
}(this, (function (exports,icon,badge,breadcrumbs,button,callout,core,datepicker,dropdown,file,forms,input,label,menu,modal,pagination,picture,popconfirm,progress,popover,scrim,select,table,tooltip,upload) { 'use strict';

	/**
	 * @fileoverview added by tsickle
	 * @suppress {checkTypes} checked by tsc
	 */

	/**
	 * @fileoverview added by tsickle
	 * @suppress {checkTypes} checked by tsc
	 */

	exports.NtIconModule = icon.NtIconModule;
	exports.NtAntIconComponent = icon.NtAntIconComponent;
	exports.NtBadgeModule = badge.NtBadgeModule;
	exports.NtBadgeComponent = badge.NtBadgeComponent;
	exports.NtBreadcrumbsModule = breadcrumbs.NtBreadcrumbsModule;
	exports.NtBreadcrumbsComponent = breadcrumbs.NtBreadcrumbsComponent;
	exports.NtButtonModule = button.NtButtonModule;
	exports.NtButtonComponent = button.NtButtonComponent;
	exports.NtButtonGroupComponent = button.NtButtonGroupComponent;
	exports.NtCalloutModule = callout.NtCalloutModule;
	exports.NtCalloutComponent = callout.NtCalloutComponent;
	exports.NT_DATE_LOCALE = core.NT_DATE_LOCALE;
	exports.NT_DATE_LOCALE_PROVIDER = core.NT_DATE_LOCALE_PROVIDER;
	exports.DateAdapter = core.DateAdapter;
	exports.NT_DATE_FORMATS = core.NT_DATE_FORMATS;
	exports.NativeDateAdapter = core.NativeDateAdapter;
	exports.NT_NATIVE_DATE_FORMATS = core.NT_NATIVE_DATE_FORMATS;
	exports.NativeDateModule = core.NativeDateModule;
	exports.NtNativeDateModule = core.NtNativeDateModule;
	exports.NtOptionModule = core.NtOptionModule;
	exports.NtOptionSelectionChange = core.NtOptionSelectionChange;
	exports.NT_OPTION_PARENT_COMPONENT = core.NT_OPTION_PARENT_COMPONENT;
	exports.NtOptionComponent = core.NtOptionComponent;
	exports.NtOverlayModule = core.NtOverlayModule;
	exports.NtOverlayComponent = core.NtOverlayComponent;
	exports.NtOverlayOrientation = core.NtOverlayOrientation;
	exports.OVERLAY_POSITIONS = core.OVERLAY_POSITIONS;
	exports.getConnectionPositionPair = core.getConnectionPositionPair;
	exports.getPositionClassName = core.getPositionClassName;
	exports.getPositionOrientation = core.getPositionOrientation;
	exports.NtDatePickerModule = datepicker.NtDatePickerModule;
	exports.NtDatePickerComponent = datepicker.NtDatePickerComponent;
	exports.createMissingDateImplError = datepicker.createMissingDateImplError;
	exports.NtDatePickerCell = datepicker.NtDatePickerCell;
	exports.NtDatePickerCalendarComponent = datepicker.NtDatePickerCalendarComponent;
	exports.NtDatePickerMonthComponent = datepicker.NtDatePickerMonthComponent;
	exports.yearsPerPage = datepicker.yearsPerPage;
	exports.yearsPerRow = datepicker.yearsPerRow;
	exports.NtDatePickerMultiYearComponent = datepicker.NtDatePickerMultiYearComponent;
	exports.NtDatePickerYearComponent = datepicker.NtDatePickerYearComponent;
	exports.NtDropdownModule = dropdown.NtDropdownModule;
	exports.NtDropdownComponent = dropdown.NtDropdownComponent;
	exports.NtDropdownPaneComponent = dropdown.NtDropdownPaneComponent;
	exports.NtFileModule = file.NtFileModule;
	exports.NtFile = file.NtFile;
	exports.NtFileComponent = file.NtFileComponent;
	exports.NtFormsModule = forms.NtFormsModule;
	exports.NtFormErrorPipe = forms.NtFormErrorPipe;
	exports.NtFormFieldComponent = forms.NtFormFieldComponent;
	exports.NtFormFieldControl = forms.NtFormFieldControl;
	exports.NtFormAutofocusDirective = forms.NtFormAutofocusDirective;
	exports.DEFAULT_TEMPLATES = forms.DEFAULT_TEMPLATES;
	exports.NtFormValidationTransformer = forms.NtFormValidationTransformer;
	exports.NT_VALIDATION_TRANSFOMER = forms.NT_VALIDATION_TRANSFOMER;
	exports.NtInputModule = input.NtInputModule;
	exports.NtInputDirective = input.NtInputDirective;
	exports.NtLabelModule = label.NtLabelModule;
	exports.NtLabelComponent = label.NtLabelComponent;
	exports.NtMenuModule = menu.NtMenuModule;
	exports.NtMenuComponent = menu.NtMenuComponent;
	exports.ɵa = modal.ɵa;
	exports.NtModalModule = modal.NtModalModule;
	exports.NT_MODAL_DATA = modal.NT_MODAL_DATA;
	exports.NT_MODAL_DEFAULT_CONFIG = modal.NT_MODAL_DEFAULT_CONFIG;
	exports.NtModal = modal.NtModal;
	exports.NtModalRef = modal.NtModalRef;
	exports.NtModalConfig = modal.NtModalConfig;
	exports.NtModalHeaderComponent = modal.NtModalHeaderComponent;
	exports.NtModalBodyComponent = modal.NtModalBodyComponent;
	exports.NtModalFooterComponent = modal.NtModalFooterComponent;
	exports.NtPaginationModule = pagination.NtPaginationModule;
	exports.PAGINATION_ELLIPSIS = pagination.PAGINATION_ELLIPSIS;
	exports.NtPaginationComponent = pagination.NtPaginationComponent;
	exports.NtPaginationConfig = pagination.NtPaginationConfig;
	exports.NT_PAGINATION_CONFIG = pagination.NT_PAGINATION_CONFIG;
	exports.NtPictureModule = picture.NtPictureModule;
	exports.zipToImage = picture.zipToImage;
	exports.NtPictureAccepts = picture.NtPictureAccepts;
	exports.NtPicture = picture.NtPicture;
	exports.NtPictureComponent = picture.NtPictureComponent;
	exports.NtPopConfirmModule = popconfirm.NtPopConfirmModule;
	exports.NtPopConfirmComponent = popconfirm.NtPopConfirmComponent;
	exports.NtProgressComponent = progress.NtProgressComponent;
	exports.NtProgressModule = progress.NtProgressModule;
	exports.NtPopoverModule = popover.NtPopoverModule;
	exports.NtPopoverComponent = popover.NtPopoverComponent;
	exports.NtPopoverPaneComponent = popover.NtPopoverPaneComponent;
	exports.NtScrimModule = scrim.NtScrimModule;
	exports.NtScrimComponent = scrim.NtScrimComponent;
	exports.NtScrimDirective = scrim.NtScrimDirective;
	exports.NtSelectModule = select.NtSelectModule;
	exports.getNtSelectDynamicMultipleError = select.getNtSelectDynamicMultipleError;
	exports.getNtSelectNonArrayValueError = select.getNtSelectNonArrayValueError;
	exports.getNtSelectNonFunctionValueError = select.getNtSelectNonFunctionValueError;
	exports.NtSelectChange = select.NtSelectChange;
	exports.NtSelectComponent = select.NtSelectComponent;
	exports.NtTableModule = table.NtTableModule;
	exports.NtTableComponent = table.NtTableComponent;
	exports.NtColumnSortChange = table.NtColumnSortChange;
	exports.NT_COLUMN = table.NT_COLUMN;
	exports.NT_COLUMN_TABLE = table.NT_COLUMN_TABLE;
	exports.NtColumnHeaderDirective = table.NtColumnHeaderDirective;
	exports.NtColumnCellDirective = table.NtColumnCellDirective;
	exports.NtColumnCellDefDirective = table.NtColumnCellDefDirective;
	exports.NtColumnComponent = table.NtColumnComponent;
	exports.NtTooltipModule = tooltip.NtTooltipModule;
	exports.NtTooltipComponent = tooltip.NtTooltipComponent;
	exports.NtUpload = upload.NtUpload;
	exports.NtUploadModule = upload.NtUploadModule;
	exports.NtUploadFile = upload.NtUploadFile;
	exports.NtUploadControl = upload.NtUploadControl;
	exports.NtUploadStatus = upload.NtUploadStatus;
	exports.NtFileAcceptError = upload.NtFileAcceptError;
	exports.NtFileSizeError = upload.NtFileSizeError;
	exports.NtFileUploadError = upload.NtFileUploadError;
	exports.NtUploadInterceptor = upload.NtUploadInterceptor;
	exports.NT_UPLOAD_INTERCEPTOR = upload.NT_UPLOAD_INTERCEPTOR;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=components.umd.js.map
