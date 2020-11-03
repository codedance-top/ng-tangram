
import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive } from '@angular/core';

@Directive({
  selector: '[ntTreeNodePadding]',
  providers: [{ provide: CdkTreeNodePadding, useExisting: NtTreeNodePaddingDirective }],
  inputs: ['level:ntTreeNodePadding', 'indent:ntTreeNodePaddingIndent']
})
export class NtTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> { }
