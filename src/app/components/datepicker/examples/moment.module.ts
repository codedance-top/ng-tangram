import { FormsModule } from '@angular/forms';
import { ExampleDatePickerMomentComponent } from "./moment";
import { NgModule } from "@angular/core";
import { NtMomentDateModule } from "@ng-tangram/moment-adapter";
import { NtDatePickerModule } from "@ng-tangram/components";
// import { NtNativeDateModule } from "@ng-tangram/components";


@NgModule({
  imports: [
    FormsModule,
    // NtNativeDateModule, // 引入NativeDate模块
    NtMomentDateModule,   // 引入MomentDate模块
    NtDatePickerModule,
  ],
  declarations: [ExampleDatePickerMomentComponent],
  exports: [ExampleDatePickerMomentComponent]
})
export class ExampleDatePickerMomentModule { }
