import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NtTooltipModule } from '@ng-tangram/components/tooltip';

import { NtExampleCodeTabsPanelComponent } from './example-code-tabs-panel.component';
import { NtExampleCodeTabsComponent } from './example-code-tabs.component';
import { NtExampleCodeComponent } from './example-code.component';
import { NtExampleLegendComponent } from './example-legend.component';
import { NtExampleShowcaseComponent } from './example-showcase.component';
import { NtExampleComponent } from './example.component';

export const NT_EXAMPLE_COMPONENTS = [
  NtExampleComponent,
  NtExampleShowcaseComponent,
  NtExampleLegendComponent,
  NtExampleCodeComponent,
  NtExampleCodeTabsComponent,
  NtExampleCodeTabsPanelComponent
];

@NgModule({
  imports: [CommonModule, NtTooltipModule],
  exports: NT_EXAMPLE_COMPONENTS,
  declarations: NT_EXAMPLE_COMPONENTS
})
export class NtExampleModule { }
