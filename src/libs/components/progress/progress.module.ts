import { NgModule } from '@angular/core';

import { NtProgressCircleComponent } from './progress-circle.component';
import { NtProgressComponent } from './progress.component';

@NgModule({
  exports: [NtProgressComponent, NtProgressCircleComponent],
  declarations: [NtProgressComponent, NtProgressCircleComponent]
})
export class NtProgressModule { }
