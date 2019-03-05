import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';

import { ProComponent } from './pro.component';
import { PRO_ROUTES } from './pro.routes';

const routes: Routes = [
  { path: '', component: ProComponent, children: PRO_ROUTES }
];


@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProComponent]
})
export class ProModule { }
