
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { TabsDocumentComponent } from './tabs.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: TabsDocumentComponent }
    ])],
  exports: [TabsDocumentComponent],
  declarations: [TabsDocumentComponent],
})
export class TabsDocumentModule { }
  