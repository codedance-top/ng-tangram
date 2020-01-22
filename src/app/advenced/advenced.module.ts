import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../shared/header';
import { AdvencedComponent } from './advenced.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
      { path: '', component: AdvencedComponent, data: { title: '高级组件' } }
    ])
  ],
  declarations: [AdvencedComponent]
})
export class AdvencedModule { }
