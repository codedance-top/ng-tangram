import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkNestedTreeNode, CdkTree, CdkTreeNode, CdkTreeNodeDef } from '@angular/cdk/tree';
import {
  AfterContentInit, Attribute, ContentChildren, Directive, ElementRef, Input, IterableDiffers,
  OnDestroy, QueryList
} from '@angular/core';

import { NtTreeNodeOutletDirective } from './outlet.directive';

@Directive({
  selector: 'nt-tree-node, [nt-tree-node]',
  exportAs: 'ntTreeNode',
  inputs: ['disabled', 'tabIndex'],
  host: {
    'class': 'nt-tree-node'
  },
  providers: [{ provide: CdkTreeNode, useExisting: NtTreeNodeDirective }]
})
export class NtTreeNodeDirective<T> extends CdkTreeNode<T> {

  private _disabled: boolean = false;
  private _tabIndex: number = 0;

  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  get tabIndex(): number { return this.disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) { this._tabIndex = value != null ? value : 0; }

  @Input() role: 'treeitem' | 'group' = 'treeitem';

  constructor(
    protected _elementRef: ElementRef,
    protected _tree: CdkTree<T>,
    @Attribute('tabindex') tabIndex: string) {
    super(_elementRef, _tree);

    this.tabIndex = Number(tabIndex) || 0;
  }
}

@Directive({
  selector: '[ntTreeNodeDef]',
  inputs: [
    'when: ntTreeNodeDefWhen'
  ],
  providers: [{ provide: CdkTreeNodeDef, useExisting: NtTreeNodeDefDirective }]
})
export class NtTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input('ntTreeNode') data: T;
}

@Directive({
  selector: 'nt-nested-tree-node, [nt-nested-tree-node]',
  exportAs: 'ntNestedTreeNode',
  host: {
    'class': 'nt-nested-tree-node',
  },
  inputs: ['disabled', 'tabIndex'],
  providers: [
    { provide: CdkNestedTreeNode, useExisting: NtNestedTreeNodeDirective },
    { provide: CdkTreeNode, useExisting: NtNestedTreeNodeDirective }
  ]
})
export class NtNestedTreeNodeDirective<T> extends CdkNestedTreeNode<T> implements AfterContentInit, OnDestroy {

  private _disabled: boolean = false;
  private _tabIndex: number = 0;

  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  get tabIndex(): number { return this.disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) { this._tabIndex = value != null ? value : 0; }

  @Input('ntNestedTreeNode') node: T;

  @ContentChildren(NtTreeNodeOutletDirective) nodeOutlet: QueryList<NtTreeNodeOutletDirective>;

  constructor(
    protected _elementRef: ElementRef,
    protected _tree: CdkTree<T>,
    protected _differs: IterableDiffers,
    @Attribute('tabindex') tabIndex: string) {
    super(_elementRef, _tree, _differs);
    this.tabIndex = Number(tabIndex) || 0;
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
