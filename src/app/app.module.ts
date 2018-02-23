import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule , BrowserTransferStateModule} from '@angular/platform-browser';
import { NtAntIconModule } from '@ng-tangram/components/ant-icon/ant-icon.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

let routes: Routes = [
  { path: '', redirectTo: 'components', pathMatch: 'full' },
  { path: 'components', loadChildren: './components/components.module#ComponentsModule', data: { title: '组件' } },
  { path: 'utils', loadChildren: './utils/utils.module#UtilsModule', data: { title: '工具' } },
  { path: '**', component: PageNotFoundComponent, data: { title: '404 - 找不到此页面' } }
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
      CommonModule,
      NtAntIconModule.forRoot(),
      BrowserModule.withServerTransition({
          appId: 'ng-tangram-demo'
      }),
      BrowserTransferStateModule,
      RouterModule.forRoot(routes, {
        initialNavigation: 'enabled',
        useHash: !environment.production
      })
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  exports: [AppComponent]
})
export class AppModule { }
