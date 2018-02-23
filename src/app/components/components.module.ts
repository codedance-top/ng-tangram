import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NtExampleModule } from '@modules/example/example.module';

import { COMPONENTS_ROUTES } from './components.routes';
import { ComponentsComponent } from './components.component';

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
