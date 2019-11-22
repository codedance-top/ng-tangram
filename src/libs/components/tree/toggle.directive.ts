import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ntTreeNodeToggle]',
  providers: [{ provide: CdkTreeNodeToggle, useExisting: NtTreeNodeToggleDirective }]
})
export class NtTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
  @Input('ntTreeNodeToggleRecursive') recursive: boolean = false;
}
