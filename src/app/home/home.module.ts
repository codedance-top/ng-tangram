
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent, data: { title: '基于 Angular 的桌面端组件库' } }
    ])
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
