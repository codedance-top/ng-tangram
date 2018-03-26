import { ModuleWithProviders, NgModule } from '@angular/core';
import { NtAntIconComponent } from './ant-icon.component';

@NgModule({
  exports: [NtAntIconComponent],
  declarations: [NtAntIconComponent],
  entryComponents: [NtAntIconComponent]
})
export class NtAntIconModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NtAntIconModule
    };
  }
}
