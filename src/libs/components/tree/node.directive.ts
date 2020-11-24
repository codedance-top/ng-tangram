import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkNestedTreeNode, CdkTree, CdkTreeNode, CdkTreeNodeDef } from '@angular/cdk/tree';
import {
  AfterContentInit,
  Attribute,
  Directive,
  ElementRef,
  Input,
  IterableDiffers,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: 'nt-tree-node, [nt-tree-node]',
  exportAs: 'ntTreeNode',
  inputs: ['disabled', 'tabIndex', 'role'],
  host: {
    'class': 'nt-tree-node'
  },
  providers: [{ provide: CdkTreeNode, useExisting: NtTreeNodeDirective }]
})
export class NtTreeNodeDirective<T> extends CdkTreeNode<T> {

  private _disabled: boolean = false;

  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  private _tabIndex: number = 0;

  get tabIndex(): number { return this.disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) { this._tabIndex = value != null ? value : 0; }

  private _role: 'treeitem' | 'group' = 'treeitem';
  public get role(): 'treeitem' | 'group' { return this._role; }
  public set role(value: 'treeitem' | 'group') {
    this._role = value;
  }

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

  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  private _tabIndex: number = 0;

  get tabIndex(): number { return this.disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) { this._tabIndex = value != null ? value : 0; }

  @Input('ntNestedTreeNode') node: T;

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
