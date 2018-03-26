import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtAntIconModule } from '@ng-tangram/components/ant-icon';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';

import { NtExampleComponent } from './example.component';
import { NtExampleShowcaseComponent } from './example-showcase.component';
import { NtExampleLegendComponent } from './example-legend.component';
import { NtExampleCodeComponent } from './example-code.component';

@NgModule({
  imports: [CommonModule, NtAntIconModule, NtTooltipModule],
  exports: [
    NtExampleComponent,
    NtExampleShowcaseComponent,
    NtExampleLegendComponent,
    NtExampleCodeComponent
  ],
  declarations: [
    NtExampleComponent,
    NtExampleShowcaseComponent,
    NtExampleLegendComponent,
    NtExampleCodeComponent
  ]
})
export class NtExampleModule { }
