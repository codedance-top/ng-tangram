import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtProgressModule } from '@ng-tangram/components/progress';

import { NtFileSizePipe } from './file-size.pipe';
import { NtFileComponent } from './file.component';

@NgModule({
  imports: [CommonModule, NtProgressModule],
  exports: [NtFileComponent, NtFileSizePipe],
  declarations: [NtFileComponent, NtFileSizePipe]
})
export class NtFileModule { }
