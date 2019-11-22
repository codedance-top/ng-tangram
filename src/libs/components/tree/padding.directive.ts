
import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ntTreeNodePadding]',
  providers: [{ provide: CdkTreeNodePadding, useExisting: NtTreeNodePaddingDirective }]
})
export class NtTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {

  @Input('ntTreeNodePadding') level: number;

  @Input('ntTreeNodePaddingIndent') indent: number;
}
