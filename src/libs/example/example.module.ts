import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtIconModule } from '@ng-tangram/components/icon';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';

import { NtExampleComponent } from './example.component';
import { NtExampleShowcaseComponent } from './example-showcase.component';
import { NtExampleLegendComponent } from './example-legend.component';
import { NtExampleCodeComponent } from './example-code.component';

export const NT_EXAMPLE_COMPONENTS = [
  NtExampleComponent,
  NtExampleShowcaseComponent,
  NtExampleLegendComponent,
  NtExampleCodeComponent
];

@NgModule({
  imports: [CommonModule, NtIconModule, NtTooltipModule],
  exports: NT_EXAMPLE_COMPONENTS,
  declarations: NT_EXAMPLE_COMPONENTS
})
export class NtExampleModule { }
