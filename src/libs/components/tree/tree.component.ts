import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { NtTreeNodeOutletDirective } from './outlet.directive';

@Component({
  selector: 'nt-tree, [nt-tree]',
  template: `<ng-container ntTreeNodeOutlet></ng-container>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CdkTree, useExisting: NtTreeComponent }
  ],
  host: {
    'class': 'nt-tree'
  }
})
export class NtTreeComponent<T> extends CdkTree<T> {
  @ViewChild(NtTreeNodeOutletDirective, {static: true}) _nodeOutlet: NtTreeNodeOutletDirective;
}
