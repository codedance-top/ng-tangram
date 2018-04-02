
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@ng-tangram/example';
import { NtMenuModule } from '@ng-tangram/components/menu';

import { MenuDocumentComponent } from './menu.component';
import { DemoMenuBasicComponent } from './demos/basic';
import { DemoMenuAlignComponent } from './demos/align';
import { DemoMenuNestedComponent } from './demos/nested';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtMenuModule,
    RouterModule.forChild([
      { path: '', component: MenuDocumentComponent }
    ])],
  declarations: [MenuDocumentComponent, DemoMenuBasicComponent, DemoMenuAlignComponent, DemoMenuNestedComponent],
})
export class MenuDocumentModule { }
