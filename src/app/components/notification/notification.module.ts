
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NtExampleModule } from '@modules/example/example.module';
import { NotificationDocumentComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    NtExampleModule,
    RouterModule.forChild([
      { path: '', component: NotificationDocumentComponent }
    ])],
  exports: [NotificationDocumentComponent],
  declarations: [NotificationDocumentComponent],
})
export class NotificationDocumentModule { }
  