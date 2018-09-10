import {
  CDK_ROW_TEMPLATE, CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef
} from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: '[ntHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: NtHeaderRowDefDirective }],
  inputs: ['columns: ntHeaderRowDef', 'sticky: ntHeaderRowDefSticky'],
})
export class NtHeaderRowDefDirective extends CdkHeaderRowDef { }

@Directive({
  selector: '[ntFooterRowDef]',
  providers: [{ provide: CdkFooterRowDef, useExisting: NtFooterRowDefDirective }],
  inputs: ['columns: ntFooterRowDef', 'sticky: ntFooterRowDefSticky'],
})
export class NtFooterRowDefDirective extends CdkFooterRowDef { }

@Directive({
  selector: '[ntRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: NtRowDefDirective }],
  inputs: ['columns: ntRowDefColumns', 'when: ntRowDefWhen'],
})
export class NtRowDefDirective<T> extends CdkRowDef<T> { }

@Component({
  selector: 'nt-header-row, tr[nt-header-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'nt-header-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ntHeaderRow',
  providers: [{ provide: CdkHeaderRow, useExisting: NtHeaderRowComponent }],
})
export class NtHeaderRowComponent extends CdkHeaderRow { }

@Component({
  selector: 'nt-footer-row, tr[nt-footer-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'nt-footer-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ntFooterRow',
  providers: [{ provide: CdkFooterRow, useExisting: NtFooterRowComponent }],
})
export class NtFooterRowComponent extends CdkFooterRow { }

@Component({
  selector: 'nt-row, tr[nt-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'nt-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ntRow',
  providers: [{ provide: CdkRow, useExisting: NtRowComponent }],
})
export class NtRowComponent extends CdkRow { }
