import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExampleDatePickerMomentComponent } from "./moment";
import { NgModule } from "@angular/core";
import { NtMomentDateModule } from "@ng-tangram/moment-adapter";
import { NtDatePickerModule } from "@ng-tangram/components";
import { NtFormsModule } from '@ng-tangram/components/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NtMomentDateModule, // 引入MomentDate模块
    NtDatePickerModule,
    NtFormsModule,
  ],
  declarations: [ExampleDatePickerMomentComponent],
  exports: [ExampleDatePickerMomentComponent]
})
export class ExampleDatePickerMomentModule { }
