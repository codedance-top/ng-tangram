import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UtilsComponent } from './utils.component';


const routes: Routes = [
  { path: '', component: UtilsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UtilsComponent],
})
export class UtilsModule { }
