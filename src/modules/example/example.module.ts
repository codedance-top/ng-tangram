import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtAntIconModule } from '@ng-tangram/components/ant-icon/ant-icon.module';

import { NtExampleComponent } from './example.component';
import { NtExampleShowcaseComponent } from './example-showcase.component';
import { NtExampleLegendComponent } from './example-legend.component';
import { NtExampleCodeComponent } from './example-code.component';

@NgModule({
  imports: [CommonModule, NtAntIconModule],
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
