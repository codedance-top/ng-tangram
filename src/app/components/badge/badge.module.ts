
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NtBadgeModule } from '@ng-tangram/components/badge';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon';

import { BadgeDocumentComponent } from './badge.component';
import { DemoBadgeBasicComponent } from './demos/basic';
import { DemoBadgeIconComponent } from './demos/icon';
import { DemoBadgeColorsComponent } from './demos/colors';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    NtBadgeModule,
    NtAntIconModule,
    RouterModule.forChild([
      { path: '', component: BadgeDocumentComponent }
    ])],
  declarations: [BadgeDocumentComponent, DemoBadgeBasicComponent, DemoBadgeIconComponent, DemoBadgeColorsComponent],
})
export class BadgeDocumentModule { }
