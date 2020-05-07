import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';

import { COMPONENTS_ROUTES } from './components-routes';
import { ComponentsComponent } from './components.component';
import { HeaderModule } from '../shared/header';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: ComponentsComponent, children: COMPONENTS_ROUTES }
    ])
  ],
  declarations: [ComponentsComponent],
})
export class ComponentsModule { }
