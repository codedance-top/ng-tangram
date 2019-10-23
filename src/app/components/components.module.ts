import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';

import { COMPONENTS_ROUTES } from './components-routes';
import { ComponentsComponent } from './components.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: ComponentsComponent, children: COMPONENTS_ROUTES }
    ])
  ],
  declarations: [ComponentsComponent],
})
export class ComponentsModule { }
