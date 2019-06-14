import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NtExampleModule } from '@ng-tangram/example';
import { PRO_ROUTES } from './pro-routes';
import { ProComponent } from './pro.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: ProComponent, children: PRO_ROUTES
      }
    ])
  ],
  declarations: [ProComponent]
})
export class ProModule { }
