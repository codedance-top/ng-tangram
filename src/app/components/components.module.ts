import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';

import { ComponentsComponent } from './components.component';
import { COMPONENTS_ROUTES } from './components.routes';

const routes: Routes = [
  { path: '', component: ComponentsComponent, children: COMPONENTS_ROUTES }
];

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentsComponent],
})
export class ComponentsModule { }
